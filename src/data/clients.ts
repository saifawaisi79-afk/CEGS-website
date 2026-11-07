export interface ClientLogo {
  id: string;
  name: string;
  logo: string;
  verified: boolean;
  category?: string;
  url?: string;
}

export const prestigiousClients: ClientLogo[] = [
  // Group 1: 25 verified companies
  { id: 'altruist', name: 'Altruist', logo: '/logos/clients/altruist.png', verified: true },
  { id: 'athena', name: 'Athena', logo: '/logos/clients/athena-bpo.jpg', verified: true },
  { id: 'cogent', name: 'Cogent', logo: '/logos/clients/cogent.svg', verified: true },
  { id: 'enser', name: 'Enser', logo: '/logos/clients/enser.png', verified: true },
  { id: 'five-s', name: 'Five S', logo: '/logos/clients/fives-digital.svg', verified: true },
  { id: 'ison', name: 'iSON', logo: '/logos/clients/ison.png', verified: true },
  { id: 'ileads', name: 'iLeads', logo: '/logos/clients/ileads.png', verified: true },
  { id: 'one-point-one', name: 'One Point One', logo: '/logos/clients/one-point-one.svg', verified: true },
  { id: 'radical-minds', name: 'Radical Minds', logo: '/logos/clients/radical-minds.png', verified: true },
  { id: 'startek', name: 'Startek', logo: '/logos/clients/startek.webp', verified: true },
  { id: 'teleperformance', name: 'Teleperformance', logo: '/logos/clients/teleperformance.png', verified: true },
  { id: 'vindhya-e-info', name: 'Vindhya e-Info', logo: '/logos/clients/vindhya.png', verified: true },
  { id: 'ebixcash', name: 'EbixCash', logo: '/logos/clients/ebixcash.png', verified: true },
  { id: 'eos', name: 'EOS', logo: '/logos/clients/eos-globe.webp', verified: true },
  { id: 'applo', name: 'Applo', logo: '/logos/clients/apollo.svg', verified: true },
  { id: 'tech-mahindra', name: 'Tech Mahindra', logo: '/logos/clients/tech-mahindra.svg', verified: true },
  { id: 'campusin', name: 'Campusin', logo: '/logos/clients/campusin.webp', verified: true },
  { id: 'asian-paints', name: 'Asian Paints', logo: '/logos/clients/asian-paints.svg', verified: true },
  { id: 'mahendra-homes', name: 'Mahendra Homes', logo: '/logos/clients/mahendra-homes.svg', verified: true },
  { id: 'south-indian-property', name: 'South Indian Property', logo: '/logos/clients/south-india-prop.webp', verified: true },
  { id: 'niva-bupa', name: 'Niva Bupa', logo: '/logos/clients/niva-bupa.svg', verified: true },
  { id: 'paisabazaar', name: 'Paisabazaar', logo: '/logos/clients/paisabazaar.svg', verified: true },
  { id: 'taurus', name: 'Taurus', logo: '/logos/clients/taurus.svg', verified: true },
  { id: 'nimbus', name: 'Nimbus', logo: '/logos/clients/nimbus.webp', verified: true },

  // Group 2: 11 verified companies
  { id: 'justdial', name: 'Justdial', logo: '/logos/clients/justdial.svg', verified: true },
  { id: 'recrosoft-tech', name: 'Recrosoft Tech', logo: '/logos/clients/recrosoft.svg', verified: true },
  { id: 'virtubes', name: 'Virtubes', logo: '/logos/clients/virtuebes.png', verified: true },
  { id: 'nexon', name: 'Nexon', logo: '/logos/clients/nexon.svg', verified: true },
  { id: 'awign', name: 'Awign', logo: '/logos/clients/awign.svg', verified: true },
  { id: 'upgrad', name: 'UpGrad', logo: '/logos/clients/upgrad.svg', verified: true },
  { id: 'equentis', name: 'Equentis', logo: '/logos/clients/equentis.svg', verified: true },
  { id: 'larsen-toubro', name: 'L&T', logo: '/logos/clients/larsen-toubro.svg', verified: true },
  { id: 'idyllic', name: 'Idyllic', logo: '/logos/clients/idyllic.webp', verified: true },
  { id: 'deloitte', name: 'Deloitte', logo: '/logos/clients/deloitte.svg', verified: true },
  { id: 'frankfinn', name: 'Frankfinn', logo: '/logos/clients/frankfinn.webp', verified: true }
];

// Balanced across two rows (18 in Row 1, 17 in Row 2)
export const clientRow1 = prestigiousClients.slice(0, 18);
export const clientRow2 = prestigiousClients.slice(18);
