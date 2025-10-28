import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create some parties if they don't exist
  const dmk = await prisma.party.create({
    data: {
      name: 'Dravida Munnetra Kazhagam',
      abbreviation: 'DMK',
      color: '#FF0000',
      logoUrl: '/images/parties/dmk.png',
    },
  });

  const aiadmk = await prisma.party.create({
    data: {
      name: 'All India Anna Dravida Munnetra Kazhagam',
      abbreviation: 'AIADMK',
      color: '#00FF00',
      logoUrl: '/images/parties/aiadmk.png',
    },
  });

  const bjp = await prisma.party.create({
    data: {
      name: 'Bharatiya Janata Party',
      abbreviation: 'BJP',
      color: '#FF9933',
      logoUrl: '/images/parties/bjp.png',
    },
  });

  const congress = await prisma.party.create({
    data: {
      name: 'Indian National Congress',
      abbreviation: 'INC',
      color: '#0000FF',
      logoUrl: '/images/parties/congress.png',
    },
  });

  console.log('✅ Parties created');

  // Create a constituency
  const chennaiCentral = await prisma.constituency.create({
    data: {
      name: 'Chennai Central',
      state: 'Tamil Nadu',
      code: 'TN001',
    },
  });

  console.log('✅ Constituencies created');

  // Create sample polls
  const poll1 = await prisma.poll.create({
    data: {
      title: 'Who will win the 2026 Tamil Nadu Assembly Elections?',
      titleTamil: '2026 தமிழ்நாடு சட்டமன்றத் தேர்தலில் யார் வெற்றி பெறுவார்கள்?',
      question: 'Which alliance do you think will form the government in Tamil Nadu after the 2026 elections?',
      questionTamil: '2026 தேர்தலுக்குப் பிறகு தமிழ்நாட்டில் எந்த கூட்டணி அரசாங்கத்தை அமைக்கும் என்று நீங்கள் நினைக்கிறீர்கள்?',
      type: 'prediction',
      status: 'active',
      endDate: new Date('2026-04-30'),
      options: {
        create: [
          {
            text: 'DMK Alliance',
            textTamil: 'திமுக கூட்டணி',
            partyId: dmk.id,
          },
          {
            text: 'AIADMK Alliance',
            textTamil: 'அதிமுக கூட்டணி',
            partyId: aiadmk.id,
          },
          {
            text: 'BJP Alliance',
            textTamil: 'பாஜக கூட்டணி',
            partyId: bjp.id,
          },
          {
            text: 'Third Front',
            textTamil: 'மூன்றாவது முன்னணி',
          },
        ],
      },
    },
  });

  const poll2 = await prisma.poll.create({
    data: {
      title: 'Who will win Chennai Central?',
      titleTamil: 'சென்னை மத்தியத்தில் யார் வெற்றி பெறுவார்கள்?',
      question: 'Which party candidate do you think will win the Chennai Central constituency?',
      questionTamil: 'சென்னை மத்திய தொகுதியில் எந்தக் கட்சி வேட்பாளர் வெற்றி பெறுவார் என்று நினைக்கிறீர்கள்?',
      type: 'prediction',
      status: 'active',
      constituencyId: chennaiCentral.id,
      endDate: new Date('2026-04-30'),
      options: {
        create: [
          {
            text: 'DMK Candidate',
            textTamil: 'திமுக வேட்பாளர்',
            partyId: dmk.id,
          },
          {
            text: 'AIADMK Candidate',
            textTamil: 'அதிமுக வேட்பாளர்',
            partyId: aiadmk.id,
          },
          {
            text: 'BJP Candidate',
            textTamil: 'பாஜக வேட்பாளர்',
            partyId: bjp.id,
          },
          {
            text: 'Independent/Other',
            textTamil: 'சுயேச்சை/பிற',
          },
        ],
      },
    },
  });

  const poll3 = await prisma.poll.create({
    data: {
      title: 'Government Performance Rating',
      titleTamil: 'அரசாங்க செயல்திறன் மதிப்பீடு',
      question: 'How would you rate the current Tamil Nadu government performance?',
      questionTamil: 'தற்போதைய தமிழ்நாடு அரசாங்கத்தின் செயல்திறனை எப்படி மதிப்பிடுவீர்கள்?',
      type: 'satisfaction',
      status: 'active',
      options: {
        create: [
          {
            text: 'Excellent',
            textTamil: 'சிறப்பு',
          },
          {
            text: 'Good',
            textTamil: 'நல்லது',
          },
          {
            text: 'Average',
            textTamil: 'சராசரி',
          },
          {
            text: 'Poor',
            textTamil: 'மோசம்',
          },
          {
            text: 'Very Poor',
            textTamil: 'மிகவும் மோசம்',
          },
        ],
      },
    },
  });

  const poll4 = await prisma.poll.create({
    data: {
      title: 'Most Important Election Issue',
      titleTamil: 'மிக முக்கியமான தேர்தல் பிரச்சினை',
      question: 'What is the most important issue for you in the 2026 elections?',
      questionTamil: '2026 தேர்தலில் உங்களுக்கு மிக முக்கியமான பிரச்சினை என்ன?',
      type: 'opinion',
      status: 'active',
      options: {
        create: [
          {
            text: 'Employment & Economy',
            textTamil: 'வேலைவாய்ப்பு மற்றும் பொருளாதாரம்',
          },
          {
            text: 'Education & Healthcare',
            textTamil: 'கல்வி மற்றும் சுகாதாரம்',
          },
          {
            text: 'Infrastructure Development',
            textTamil: 'உள்கட்டமைப்பு வளர்ச்சி',
          },
          {
            text: 'Agriculture & Farmers',
            textTamil: 'விவசாயம் மற்றும் விவசாயிகள்',
          },
          {
            text: 'Law & Order',
            textTamil: 'சட்டம் மற்றும் ஒழுங்கு',
          },
        ],
      },
    },
  });

  console.log('✅ Sample polls created:', {
    poll1: poll1.title,
    poll2: poll2.title,
    poll3: poll3.title,
    poll4: poll4.title,
  });

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
