import { ContactPerson } from '@/lib/types';
import { Mail, Phone, User } from 'lucide-react';

export function ContactCard({ contact }: { contact: ContactPerson }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-surface-200 bg-white p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
        <User className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="font-medium text-foreground">{contact.naam}</p>
        <p className="text-sm text-gray-500">{contact.functie}</p>
        <div className="mt-2 flex flex-col gap-1">
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700"
          >
            <Mail className="h-3.5 w-3.5" />
            {contact.email}
          </a>
          {contact.telefoon && (
            <a
              href={`tel:${contact.telefoon}`}
              className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700"
            >
              <Phone className="h-3.5 w-3.5" />
              {contact.telefoon}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
