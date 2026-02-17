'use client';

import { useState, useEffect } from 'react';
import { Stethoscope, Award, Building2, Landmark } from 'lucide-react';

const STORAGE_KEY = 'user-role';

interface Role {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const roles: Role[] = [
  {
    id: 'zorgprofessional',
    title: 'Zorgprofessional',
    icon: Stethoscope,
    description:
      'Jij ziet dagelijks jongeren die vastlopen. Wachtlijsten, doorverwijzingen die nergens toe leiden, en het gevoel dat het beter moet. Dit platform is gebouwd voor jou \u2014 om samen met collega\u2019s in jouw regio de zorg slimmer te organiseren. Ontdek wat er al werkt en sluit je aan.',
  },
  {
    id: 'kopgroeplid',
    title: 'Zorgbestuurder (Kopgroeplid)',
    icon: Award,
    description:
      'Jullie organisatie loopt voorop in de transformatie van jeugd-GGZ. Hier vind je de tools en data om jullie aanpak te versterken, resultaten zichtbaar te maken, en andere regio\u2019s te inspireren. Bekijk de voortgang en deel jullie inzichten.',
  },
  {
    id: 'geen-kopgroeplid',
    title: 'Zorgbestuurder (nog geen Kopgroeplid)',
    icon: Building2,
    description:
      'De beweging groeit \u2014 en er is plek voor jouw organisatie. Ontdek wat de kopgroep al bereikt heeft en wat aansluiting jouw regio kan opleveren: minder wachtlijsten, betere samenwerking, en meetbaar resultaat.',
  },
  {
    id: 'wethouder',
    title: 'Wethouder',
    icon: Landmark,
    description:
      'Als bestuurder en beleidsmaker ben jij de onmisbare schakel in deze beweging. Zonder jou als wethouder kan deze transformatie niet slagen. Zie hoe zorgprofessionals en bestuurders samenwerken aan concrete oplossingen \u2014 en wat dit betekent voor de jongeren in jouw gemeente. De cijfers en verhalen spreken voor zich.',
  },
];

export default function RoleSelector() {
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [welcomeRole, setWelcomeRole] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const handleSelect = (role: Role) => {
    localStorage.setItem(STORAGE_KEY, role.id);
    setWelcomeRole(role.title);

    setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setVisible(false);
      }, 500);
    }, 1200);
  };

  const handleSkip = () => {
    localStorage.setItem(STORAGE_KEY, 'overgeslagen');
    setFadeOut(true);
    setTimeout(() => {
      setVisible(false);
    }, 500);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary-800 via-primary-700 to-sky-900 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {welcomeRole ? (
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Welkom, {welcomeRole}!
          </h2>
        </div>
      ) : (
        <div className="w-full max-w-5xl px-4 py-8 overflow-y-auto max-h-screen">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              Welkom bij Samen Mentaal Gezond
            </h1>
            <p className="mt-4 text-lg text-white/80 md:text-xl">
              Wie ben jij? We laten je graag zien wat dit initiatief voor jou
              betekent.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {roles.map((role) => {
              const Icon = role.icon;
              const isHovered = hoveredId === role.id;

              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => handleSelect(role)}
                  onMouseEnter={() => setHoveredId(role.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`flex flex-col items-start gap-4 rounded-2xl bg-white p-6 text-left shadow-lg transition-all duration-200 cursor-pointer ${
                    isHovered
                      ? 'ring-4 ring-sky-400 scale-[1.02] shadow-2xl'
                      : 'ring-0 scale-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {role.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {role.description}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={handleSkip}
              className="text-sm text-white/60 underline underline-offset-4 transition-colors duration-150 hover:text-white/90"
            >
              Overslaan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
