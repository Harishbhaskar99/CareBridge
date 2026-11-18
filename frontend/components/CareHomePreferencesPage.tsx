import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  MapPin, 
  Bed, 
  SlidersHorizontal, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle,
  Clock,
  Compass,
  Star,
  Hotel
} from 'lucide-react';
import { 
  CareUnitsRecord, 
  CareHomePreferences, 
  ProximityFilter, 
  AvailabilityPackageFilter, 
  RoomTypeFilter 
} from '../types';

interface CareHomePreferencesPageProps {
  matchedUnitsFromStep3: CareUnitsRecord[];
  startDate: string;
  endDate: string;
  durationDays: number;
  onSelectUnitAndConfirm: (unit: CareUnitsRecord, prefs: CareHomePreferences) => void;
  onBackToStep3: () => void;
  selectedUnitId?: string;
}

export const CareHomePreferencesPage: React.FC<CareHomePreferencesPageProps> = ({
  matchedUnitsFromStep3,
  startDate,
  endDate,
  durationDays,
  onSelectUnitAndConfirm,
  onBackToStep3,
  selectedUnitId
}) => {
  // Optional Preferences State
  const [proximity, setProximity] = useState<ProximityFilter>('all');
  const [availabilityPackage, setAvailabilityPackage] = useState<AvailabilityPackageFilter>('all');
  const [roomType, setRoomType] = useState<RoomTypeFilter>('all');
  const [specialistOnCallOnly, setSpecialistOnCallOnly] = useState<boolean>(false);
  const [vacantBedsOnly, setVacantBedsOnly] = useState<boolean>(true);

  // Selected Unit State
  const [chosenUnit, setChosenUnit] = useState<CareUnitsRecord | null>(() => {
    if (selectedUnitId) {
      return matchedUnitsFromStep3.find(u => u.care_unit_id === selectedUnitId) || null;
    }
    return matchedUnitsFromStep3[0] || null;
  });

  // Filter matched units according to optional preferences
  const finalFilteredUnits = useMemo(() => {
    return matchedUnitsFromStep3.filter(unit => {
      // 1. Proximity filter (within 1, 3, 5, 10 miles)
      if (proximity !== 'all') {
        const maxDist = parseFloat(proximity);
        if (unit.distance_miles !== undefined && unit.distance_miles > maxDist) {
          return false;
        }
      }

      // 2. Availability Package (Standard, Enhanced, Premier)
      if (availabilityPackage !== 'all') {
        if (unit.package_tier !== availabilityPackage) {
          return false;
        }
      }

      // 3. Room Type
      if (roomType !== 'all') {
        if (unit.room_type !== roomType) {
          return false;
        }
      }

      // 4. Specialist on call
      if (specialistOnCallOnly && !unit.specialist_on_call) {
        return false;
      }

      // 5. Must have vacant bed
      if (vacantBedsOnly && (!unit.available_beds || unit.available_beds <= 0)) {
        return false;
      }

      return true;
    });
  }, [matchedUnitsFromStep3, proximity, availabilityPackage, roomType, specialistOnCallOnly, vacantBedsOnly]);

  const handleConfirm = () => {
    if (!chosenUnit) {
      alert('Please select an available care home from the list.');
      return;
    }
    onSelectUnitAndConfirm(chosenUnit, {
      proximity,
      availabilityPackage,
      roomType,
      specialistOnCallOnly,
      minBedVacancy: vacantBedsOnly ? 1 : 0
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-bupa-300 shadow-xl space-y-7 animate-fadeIn">
      {/* Top Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div>
          <button
            type="button"
            onClick={onBackToStep3}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-bupa-600 hover:text-bupa-800 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Step 3 (Conditions Form)</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-bupa-600 text-white font-bold text-xs flex items-center justify-center shadow">
              4
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Matched Care Homes &amp; Admission Preferences
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Choose your preferred location radius and package tier to finalize placement for 
            <strong className="text-slate-900"> {startDate} to {endDate} ({durationDays} days)</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-bupa-50 text-bupa-700 font-bold border border-bupa-200 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-bupa-600" />
            <span>{finalFilteredUnits.length} Care Homes Available</span>
          </span>
        </div>
      </div>

      {/* OPTIONAL PREFERENCES PANEL */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
            <SlidersHorizontal className="w-4 h-4 text-bupa-600" />
            <span>Customize Optional Preferences (Optional)</span>
          </div>
          {(proximity !== 'all' || availabilityPackage !== 'all' || roomType !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setProximity('all');
                setAvailabilityPackage('all');
                setRoomType('all');
                setSpecialistOnCallOnly(false);
              }}
              className="text-xs text-bupa-600 hover:underline font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {/* Proximity Option */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1.5 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-bupa-600" />
              <span>Proximity Radius (Optional)</span>
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['1', '3', '5', '10'] as const).map((dist) => (
                <button
                  type="button"
                  key={dist}
                  onClick={() => setProximity(proximity === dist ? 'all' : dist)}
                  className={`py-1.5 px-2 rounded-lg border text-center font-semibold transition-all ${
                    proximity === dist
                      ? 'bg-bupa-600 text-white border-bupa-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  ≤ {dist} mi
                </button>
              ))}
            </div>
          </div>

          {/* Availability Package Option */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1.5 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-bupa-600" />
              <span>Availability Package (Optional)</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['Standard', 'Enhanced', 'Premier'] as const).map((pkg) => (
                <button
                  type="button"
                  key={pkg}
                  onClick={() => setAvailabilityPackage(availabilityPackage === pkg ? 'all' : pkg)}
                  className={`py-1.5 px-1.5 rounded-lg border text-center font-semibold text-[11px] transition-all ${
                    availabilityPackage === pkg
                      ? 'bg-bupa-600 text-white border-bupa-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {pkg}
                </button>
              ))}
            </div>
          </div>

          {/* Room Type Option */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1.5 flex items-center gap-1">
              <Hotel className="w-3.5 h-3.5 text-bupa-600" />
              <span>Room Specification (Optional)</span>
            </label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value as any)}
              className="w-full py-1.5 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:border-bupa-500"
            >
              <option value="all">Any Room Specification</option>
              <option value="En-Suite Private Suite">En-Suite Private Suite</option>
              <option value="High-Dependency Single Room">High-Dependency Single Room</option>
            </select>
          </div>
        </div>

        {/* Quick Checkboxes */}
        <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-200 text-xs">
          <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
            <input
              type="checkbox"
              checked={vacantBedsOnly}
              onChange={(e) => setVacantBedsOnly(e.target.checked)}
              className="rounded text-bupa-600 focus:ring-bupa-500"
            />
            <span>Show only homes with immediate bed vacancies</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
            <input
              type="checkbox"
              checked={specialistOnCallOnly}
              onChange={(e) => setSpecialistOnCallOnly(e.target.checked)}
              className="rounded text-bupa-600 focus:ring-bupa-500"
            />
            <span>Dedicated Consultant / Intensivist On-Call</span>
          </label>
        </div>
      </div>

      {/* MATCHED CARE HOMES CARDS LIST */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Building2 className="w-4 h-4 text-bupa-600" />
            <span>Available Matched Care Homes ({finalFilteredUnits.length})</span>
          </h3>
          <span className="text-xs text-slate-500">
            Click any care home card below to select your placement
          </span>
        </div>

        {finalFilteredUnits.length === 0 ? (
          <div className="p-8 text-center border-2 border-dashed border-amber-200 rounded-2xl bg-amber-50/50 space-y-2">
            <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
            <h4 className="text-sm font-bold text-slate-900">
              No care homes match your current proximity or package filters
            </h4>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Broaden your proximity radius (e.g. within 10 miles) or choose "Any Package" to view all clinically compatible homes.
            </p>
            <button
              type="button"
              onClick={() => {
                setProximity('all');
                setAvailabilityPackage('all');
                setRoomType('all');
              }}
              className="mt-2 px-4 py-1.5 text-xs font-semibold bg-bupa-600 text-white rounded-lg shadow-sm"
            >
              Reset Optional Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {finalFilteredUnits.map((home) => {
              const isSelected = chosenUnit?.care_home_id === home.care_home_id && chosenUnit?.care_unit_id === home.care_unit_id;
              const vacancies = home.available_beds ?? 2;

              return (
                <div
                  key={`${home.care_home_id}-${home.care_unit_id}`}
                  onClick={() => setChosenUnit(home)}
                  className={`cursor-pointer rounded-2xl p-5 border-2 transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-bupa-500 bg-bupa-50/70 shadow-md ring-2 ring-bupa-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-2.5">
                    {/* Top Row: Unit Tag, Distance, & Vacancy Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono px-2 py-0.5 bg-bupa-100 text-bupa-800 rounded font-bold border border-bupa-200">
                        {home.care_unit_id}
                      </span>

                      <div className="flex items-center gap-2">
                        {home.distance_miles !== undefined && (
                          <span className="text-xs font-mono text-slate-600 font-semibold flex items-center gap-1">
                            <Compass className="w-3.5 h-3.5 text-bupa-600" />
                            {home.distance_miles} miles away
                          </span>
                        )}

                        {/* Bed Vacancy Badge */}
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 font-mono ${
                          vacancies > 0
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-red-100 text-red-800 border border-red-200'
                        }`}>
                          <Bed className="w-3.5 h-3.5" />
                          <span>{vacancies > 0 ? `${vacancies} Beds Vacant` : 'Fully Occupied'}</span>
                        </span>
                      </div>
                    </div>

                    {/* Care Home Name */}
                    <div>
                      <h4 className="font-bold text-slate-900 text-base leading-tight">
                        {home.care_home_name || home.care_home_id}
                      </h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>Postal Code: {home.postal_code}</span>
                      </p>
                    </div>

                    {/* Room & Package Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {home.package_tier && (
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 rounded font-bold">
                          {home.package_tier} Package
                        </span>
                      )}
                      {home.room_type && (
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded">
                          {home.room_type}
                        </span>
                      )}
                      {home.specialist_on_call && (
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-teal-50 text-teal-700 border border-teal-200 rounded">
                          Doctor On-Call
                        </span>
                      )}
                    </div>

                    {/* Capabilities preview */}
                    <div className="text-xs text-slate-600 line-clamp-1 pt-1">
                      <strong>Supported:</strong> {home.mobility_status.join(', ')}
                    </div>
                  </div>

                  {/* Card Footer Selection indicator */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono text-[11px]">
                      care_home_id: {home.care_home_id}
                    </span>
                    <span className={`font-bold flex items-center gap-1 ${
                      isSelected ? 'text-bupa-700' : 'text-slate-500'
                    }`}>
                      {isSelected ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-bupa-600" />
                          <span>Selected Care Home</span>
                        </>
                      ) : (
                        <span>Click to Select</span>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Selected Home Confirmation Bar & Action Button */}
      {chosenUnit && (
        <div className="bg-bupa-50 border border-bupa-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-fadeIn">
          <div>
            <span className="text-bupa-600 font-bold uppercase tracking-wider block text-[11px]">
              Ready to Authorize Admission:
            </span>
            <div className="font-bold text-slate-900 text-sm mt-0.5">
              {chosenUnit.care_home_name || chosenUnit.care_home_id} — {chosenUnit.care_unit_id}
            </div>
            <div className="text-slate-600 font-mono text-[11px] mt-0.5">
              {chosenUnit.postal_code} • {chosenUnit.package_tier || 'Standard'} Package • {chosenUnit.available_beds ?? 2} Beds Vacant
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToStep3}
              className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-semibold transition-colors"
            >
              Modify Conditions
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-6 py-2.5 bg-bupa-600 hover:bg-bupa-700 text-white font-extrabold rounded-xl shadow-lg shadow-bupa-600/30 transition-all flex items-center gap-2"
            >
              <span>Confirm &amp; Complete Admission</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
