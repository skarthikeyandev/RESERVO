export const SERVICES = [
  {
    id: 1, name: 'Deep Tissue Massage', icon: '💆', category: 'Wellness',
    desc: 'Expert full-body massage targeting deep muscle tension for complete relaxation.',
    price: 120, duration: '60 min',
    bg: 'linear-gradient(135deg, #E8D5C4 0%, #D4B8A0 100%)',
  },
  {
    id: 2, name: 'Yoga & Meditation', icon: '🧘', category: 'Wellness',
    desc: 'Private guided session combining hatha yoga poses with mindfulness meditation.',
    price: 85, duration: '75 min',
    bg: 'linear-gradient(135deg, #C8DCC8 0%, #A8C4A8 100%)',
  },
  {
    id: 3, name: 'Business Consultation', icon: '💼', category: 'Consulting',
    desc: 'One-on-one strategy session with an experienced business advisor.',
    price: 200, duration: '60 min',
    bg: 'linear-gradient(135deg, #C4CCDC 0%, #A0ACCC 100%)',
  },
  {
    id: 4, name: 'Nutrition Coaching', icon: '🥗', category: 'Health',
    desc: 'Personalised nutrition plan and coaching session tailored to your wellness goals.',
    price: 95, duration: '45 min',
    bg: 'linear-gradient(135deg, #DCD8C4 0%, #C4BCA0 100%)',
  },
  {
    id: 5, name: 'Personal Training', icon: '🏋️', category: 'Health',
    desc: 'Intensive personal training session with a certified fitness expert.',
    price: 110, duration: '60 min',
    bg: 'linear-gradient(135deg, #DCC8C8 0%, #C4A0A0 100%)',
  },
  {
    id: 6, name: 'Life Coaching', icon: '🌟', category: 'Consulting',
    desc: 'Transform your mindset and achieve personal goals with an expert life coach.',
    price: 150, duration: '60 min',
    bg: 'linear-gradient(135deg, #DDD4C0 0%, #C8BCA0 100%)',
  },
  {
    id: 7, name: 'Aromatherapy Session', icon: '🌸', category: 'Wellness',
    desc: 'Relaxing essential oil therapy using premium botanical blends.',
    price: 90, duration: '50 min',
    bg: 'linear-gradient(135deg, #DCC8D8 0%, #C4A8CC 100%)',
  },
  {
    id: 8, name: 'Financial Planning', icon: '📊', category: 'Consulting',
    desc: 'Expert guidance on investment strategy and long-term financial planning.',
    price: 180, duration: '90 min',
    bg: 'linear-gradient(135deg, #C8D8DC 0%, #A0C4CC 100%)',
  },
  {
    id: 9, name: 'Acupuncture', icon: '🪡', category: 'Health',
    desc: 'Traditional acupuncture treatment for pain relief and holistic healing.',
    price: 100, duration: '45 min',
    bg: 'linear-gradient(135deg, #D8DCC8 0%, #BCC4A0 100%)',
  },
]

export const TIME_SLOTS = [
  '9:00 AM',  '9:30 AM',  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '1:00 PM',  '1:30 PM',  '2:00 PM',  '2:30 PM',  '3:00 PM',  '3:30 PM',
  '4:00 PM',  '4:30 PM',  '5:00 PM',
]

export const CATEGORIES = ['All', ...new Set(SERVICES.map(s => s.category))]

export function getServiceById(id) {
  return SERVICES.find(s => s.id === id) || null
}
