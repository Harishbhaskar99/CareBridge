import { GoogleGenAI, Type } from '@google/genai';

export interface ClinicalTriageAssessment {
  urgencyLevel: 'Emergency / Immediate MECU Dispatch' | 'Urgent Extensive Care Admission' | 'Elective HDU Observation' | 'General Ward Sufficient';
  clinicalSummary: string;
  recommendedUnit: string;
  suggestedInterventions: string[];
  bupaCoverageNote: string;
}

export interface ReleaseDocumentAuditResult {
  isCompliant: boolean;
  detectedPatientName: string;
  authorizingPhysician: string;
  clinicalReadiness: string;
  verificationNotes: string;
}

export async function triageExtensiveCareRequest(
  symptomsAndVitals: string
): Promise<ClinicalTriageAssessment> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY, vertexai: true });

  const prompt = `You are the Bupa Chief Clinical Medical Officer for the Medical Extensive Care Unit (MECU).
Evaluate the following patient condition / clinical inquiry:
"${symptomsAndVitals}"

Provide an authoritative triage evaluation regarding suitability for Medical Extensive Care Unit (MECU) vs High Dependency Unit (HDU) vs general hospital care under Bupa healthcare cover guidelines.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          urgencyLevel: {
            type: Type.STRING,
            description: 'The triage acuity bracket'
          },
          clinicalSummary: {
            type: Type.STRING,
            description: 'Summary of clinical rationale and vital assessment'
          },
          recommendedUnit: {
            type: Type.STRING,
            description: 'Exact ward/unit recommendation, e.g. Medical Extensive Care Unit (MECU) - Acute Ward'
          },
          suggestedInterventions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: 'Immediate clinical safeguards and steps to execute'
          },
          bupaCoverageNote: {
            type: Type.STRING,
            description: 'Pre-authorization and hospital agreement confirmation statement'
          }
        },
        propertyOrdering: ['urgencyLevel', 'clinicalSummary', 'recommendedUnit', 'suggestedInterventions', 'bupaCoverageNote']
      }
    }
  });

  const parsed = JSON.parse(response.text || '{}');
  return parsed as ClinicalTriageAssessment;
}

export async function verifyUploadedReleaseDoc(
  fileName: string,
  extraDetails: string
): Promise<ReleaseDocumentAuditResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY, vertexai: true });

  const prompt = `You are Bupa's automated Hospital Clinical Records Verification engine.
Validate the incoming patient hospital release document named: "${fileName}" with context: "${extraDetails}".
Confirm compliance with the Medical Extensive Care Unit (MECU) admission and patient transfer protocols.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          isCompliant: { type: Type.BOOLEAN, description: 'True if acceptable for MECU intake' },
          detectedPatientName: { type: Type.STRING, description: 'Identified patient name' },
          authorizingPhysician: { type: Type.STRING, description: 'Consultant / Intensivist' },
          clinicalReadiness: { type: Type.STRING, description: 'Assessment of readiness for transfer to extensive care' },
          verificationNotes: { type: Type.STRING, description: 'Immediate validation note for member' }
        },
        propertyOrdering: ['isCompliant', 'detectedPatientName', 'authorizingPhysician', 'clinicalReadiness', 'verificationNotes']
      }
    }
  });

  const parsed = JSON.parse(response.text || '{}');
  return parsed as ReleaseDocumentAuditResult;
}
