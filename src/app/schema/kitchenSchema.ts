const kitchenSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  'name': 'Меню боно | Кухня ресторана боно',
  'url': 'https://bono-bar.com/kitchen',
  'image': 'https://bono-bar.com/images/pasta',
  'telephone': '+996505046256',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'улица Сухэ-Батора,17',
    'addressLocality': 'Бишкек',
    'addressRegion': 'Чуй',
    'postalCode': '720001',
    'addressCountry': 'KG',
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': 42.828840811702065,
    'longitude': 74.62891862952318,
  },
  'contactPoint': {
    '@type': 'ContactPoint',
    'telephone': '+996505046256',
    'contactType': 'customer service',
    'areaServed': ['KG'],
  },
  'servesCuisine': 'Европейская, Итальянская',
  'priceRange': '800-2600 KGS',
  'aggregateRating': {
    '@type': 'AggregateRating',
    'ratingValue': '4.6',
    'bestRating': '5',
    'ratingCount': '1290',
  },
  'openingHours': ['Mo-Su 10:00-02:00'],
  'sameAs': [
    'https://www.instagram.com/bono.bar.bishkek',
    'mailto:bono.bar.bishkek@gmail.com',
    'https://t.me/+996505046256',
    'https://wa.me/+996505046256',
  ],
};

export default kitchenSchema;
