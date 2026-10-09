// Copy from design/content/home.json. Schedule and closures live in lib/hours.ts.
// Image descriptions come from design/assets.json (home.json contains image IDs only).
export const home = {
  "business": {
    "name": "Shop De Bie",
    "legalTagline": "Wasserij · Droogkuis",
    "foundingYear": 1950,
    "address": {
      "street": "Leopoldlaan 39",
      "postalCode": "9400",
      "city": "Ninove",
      "country": "BE"
    },
    "phone": {
      "display": "054 33 11 12",
      "href": "tel:+3254331112",
      "e164": "+3254331112"
    },
    "mobile": {
      "display": "0495 52 08 26",
      "href": "tel:+32495520826",
      "e164": "+32495520826"
    },
    "email": "TODO(client)",
    "vat": "BE 0418.374.955",
    "facebook": "https://www.facebook.com/shopdebie/",
    "mapsDirections": "https://www.google.com/maps/dir/?api=1&destination=Leopoldlaan+39,+9400+Ninove",
    "mapsEmbed": "https://maps.google.com/maps?q=Leopoldlaan%2039%2C%209400%20Ninove&t=m&z=16&output=embed",
    "geo": {
      "lat": "TODO(client)",
      "lng": "TODO(client)"
    }
  },
  "hours": {
    "timezone": "Europe/Brussels",
    "closedLabel": "Gesloten",
    "rangeSeparator": " · ",
    "timeSeparator": "–",
    "footerSummary": [
      "Ma–vr 09:00–12:00 · 13:00–18:00",
      "Za 09:00–12:00"
    ]
  },
  "status": {
    "openUntil": "Nu open tot {time}",
    "opensToday": "Open om {time}",
    "opensTomorrow": "Morgen open om {time}",
    "opensOnDay": "{Day} open om {time}",
    "closedForHoliday": "Gesloten · {label}"
  },
  "nav": {
    "links": [
      {
        "label": "Diensten",
        "href": "#diensten"
      },
      {
        "label": "Werkwijze",
        "href": "#werkwijze"
      },
      {
        "label": "Ons verhaal",
        "href": "#verhaal"
      },
      {
        "label": "Contact",
        "href": "#bezoek"
      }
    ],
    "cta": {
      "label": "Ophaling aanvragen",
      "href": "#bezoek"
    },
    "menuButton": "Menu",
    "menuClose": "Sluiten",
    "skipLink": "Naar inhoud"
  },
  "hero": {
    "image": "hero-wasserij",
    "eyebrow": "Wasserij · Droogkuis · Ninove",
    "titleLines": [
      "Met de ijver",
      "van een bij."
    ],
    "lead": "Sinds 1950 zorgen drie generaties voor uw kleding, gordijnen, dekens en trouwjurk.",
    "primary": {
      "label": "Ontdek onze diensten",
      "href": "#diensten"
    },
    "secondary": {
      "label": "Bel 054 33 11 12",
      "href": "tel:+3254331112"
    }
  },
  "pillars": [
    {
      "nr": "01",
      "title": "Vakmanschap",
      "text": "Opgeleid in de behandeling van textiel en vlekken."
    },
    {
      "nr": "02",
      "title": "Groen bedrijf",
      "text": "De juiste dosis water en ecologische reinigingsproducten."
    },
    {
      "nr": "03",
      "title": "Zorg voor textiel",
      "text": "Uw kleding blijft langer mooi en gaat langer mee."
    },
    {
      "nr": "04",
      "title": "Meer tijd voor u",
      "text": "Wij doen het werk, u geniet van de aangenamere dingen."
    }
  ],
  "services": {
    "eyebrow": "Diensten",
    "title": "Van hemd tot trouwjurk.",
    "lead": "Wij reinigen alle kledingstukken en huishoudtextiel: van ceremoniekleding en leder tot gordijnen, donsdekens en tapijten.",
    "feature": {
      "nr": "01",
      "tag": "Specialisatie",
      "title": "Droogkuis",
      "text": "Kleding, ceremoniekleding, trouwjurken, leder en daim. Onze moderne reinigingsmachines werken met een ecologisch reinigingsmiddel op basis van alcohol."
    },
    "items": [
      {
        "nr": "02",
        "title": "Wassen",
        "text": "Privé-, beroeps- en horecalinnen: tafel-, bed- en huishoudlinnen, hemden en meer."
      },
      {
        "nr": "03",
        "title": "Strijkdienst",
        "text": "Hemden, broeken en vesten, afgewerkt op professionele persen en toppers."
      },
      {
        "nr": "04",
        "title": "Herstellingen & stoppages",
        "text": "Een losse zoom, een kapotte rits, een gaatje in uw favoriete trui."
      },
      {
        "nr": "05",
        "title": "Gordijnen & dekens",
        "text": "Over- en vouwgordijnen, stores, (dons)dekens, kussens en tapijten."
      }
    ],
    "pickup": {
      "nr": "06",
      "tag": "Aan huis",
      "title": "Eigen ophaaldienst",
      "text": "Geen tijd om langs te komen? Wij halen uw kleding en huishoudtextiel op en brengen het proper terug.",
      "cta": {
        "label": "Ophaling aanvragen",
        "href": "#bezoek"
      },
      "note": "TODO(client): pick-up areas, days, cost. Copy above is written by the designer and needs client sign-off."
    }
  },
  "story": {
    "eyebrow": "Ons verhaal · sinds 1950",
    "title": "De laatste van zeven.",
    "text": "In 1950 namen onze grootouders een bestaande wasserij over en noemden ze ‘De Bie’, naar de naarstige bij. In de jaren ’90 telde Ninove nog zeven droogkuiszaken. Vandaag zijn wij de enige die overbleef.",
    "stats": [
      {
        "value": "1950",
        "label": "Opgericht"
      },
      {
        "value": "1991",
        "label": "3e generatie"
      },
      {
        "value": "2017",
        "label": "Groen pand"
      }
    ],
    "cta": {
      "label": "Lees ons verhaal",
      "href": "/ons-verhaal"
    },
    "image": "story-bart-mady",
    "caption": "Bart De Smet & Mady Buys"
  },
  "process": {
    "eyebrow": "Werkwijze",
    "title": "Elk stuk krijgt een nummer.",
    "lead": "Negen vaste stappen, van de toonbank tot de verpakking. Zo raakt er niets zoek en krijgt elk stuk de behandeling die het nodig heeft.",
    "steps": [
      {
        "nr": "01",
        "title": "Markering",
        "text": "Ieder stuk krijgt een eigen nummer."
      },
      {
        "nr": "02",
        "title": "Sortering",
        "text": "Op kleur: wit, licht en donker."
      },
      {
        "nr": "03",
        "title": "Vlekkencheck",
        "text": "Elk stuk wordt nagekeken."
      },
      {
        "nr": "04",
        "title": "Vlekkenbehandeling",
        "text": "Stuk per stuk, met de juiste aanpak."
      },
      {
        "nr": "05",
        "title": "Reiniging",
        "text": "Machinaal, met ecologische producten."
      },
      {
        "nr": "06",
        "title": "Stomen",
        "text": "Ontspant de vezels, haalt kreuken weg."
      },
      {
        "nr": "07",
        "title": "Strijken",
        "text": "Afwerking op tafel en toppers."
      },
      {
        "nr": "08",
        "title": "Ticketcontrole",
        "text": "Uw stukken worden samengebracht."
      },
      {
        "nr": "09",
        "title": "Verpakking",
        "text": "Netjes verpakt, klaar om op te halen."
      }
    ]
  },
  "loyalty": {
    "eyebrow": "Klantenkaart",
    "title": "Blijvende korting, elke keer opnieuw.",
    "lead": "Vraag uw Shop De Bie-klantenkaart aan de toonbank. De korting geldt op:",
    "items": [
      "Alle droogkuiskleding",
      "Ceremoniekleding & trouwjurken",
      "Over- en vouwgordijnen",
      "(Dons)dekens",
      "Regen- en skikleding"
    ],
    "card": {
      "label": "Klantenkaart",
      "name": "Shop De Bie",
      "sub": "Nr. 1950 · blijvende korting"
    }
  },
  "visit": {
    "eyebrow": "Kom langs",
    "title": "Leopoldlaan 39, Ninove.",
    "buttons": [
      {
        "label": "Tel. 054 33 11 12",
        "href": "tel:+3254331112",
        "variant": "ink"
      },
      {
        "label": "Gsm 0495 52 08 26",
        "href": "tel:+32495520826",
        "variant": "outline"
      },
      {
        "label": "Route plannen →",
        "href": "https://www.google.com/maps/dir/?api=1&destination=Leopoldlaan+39,+9400+Ninove",
        "variant": "outline",
        "external": true
      }
    ],
    "map": {
      "placeholderLabel": "Kaart",
      "placeholderText": "De kaart wordt geladen via Google Maps.",
      "loadButton": "Kaart laden",
      "iframeTitle": "Kaart Shop De Bie"
    }
  },
  "footer": {
    "tagline": "Wasserij en droogkuis in Ninove. Familiebedrijf sinds 1950.",
    "columns": {
      "visit": "Bezoek",
      "contact": "Contact",
      "menu": "Menu"
    },
    "copyright": "© {year} Shop De Bie · BE 0418.374.955",
    "privacy": {
      "label": "Privacy & cookies",
      "href": "/privacy"
    }
  },
  "seo": {
    "title": "Shop De Bie — Wasserij & droogkuis in Ninove",
    "description": "Familiebedrijf sinds 1950. Droogkuis, wassen, strijken, herstellingen, gordijnen en dekens. Ecologisch gereinigd aan de Leopoldlaan 39 in Ninove, met eigen ophaaldienst.",
    "ogTitle": "Met de ijver van een bij.",
    "siteUrl": "https://shopdebie.be",
    "locale": "nl_BE"
  },
  "privacy": {
    "title": "Privacy & cookies",
    "sections": [
      "Wie zijn wij",
      "Welke gegevens verzamelen we",
      "Waarom",
      "Hoe lang bewaren we ze",
      "Uw rechten",
      "Cookies",
      "Contact"
    ],
    "body": "TODO(client)"
  },
  "notFound": {
    "title": "Deze pagina is zoek.",
    "text": "Wij vinden normaal alles terug. Deze pagina helaas niet.",
    "cta": {
      "label": "Naar de homepage",
      "href": "/"
    }
  },
  "images": {
    "hero-wasserij": {
      "src": "/images/hero-wasserij.jpg",
      "alt": "Wasmachines in de wasserij van Shop De Bie"
    },
    "story-bart-mady": {
      "src": "/images/story-bart-mady.jpg",
      "alt": "Bart De Smet en Mady Buys, derde generatie van Shop De Bie"
    },
    "hero-strijkatelier": {
      "src": "/images/hero-strijkatelier.jpg",
      "alt": "Het strijkatelier"
    },
    "hero-droogkuismachine": {
      "src": "/images/hero-droogkuismachine.jpg",
      "alt": "De droogkuismachine"
    },
    "hero-winkel": {
      "src": "/images/hero-winkel.jpg",
      "alt": "De winkel aan de Leopoldlaan"
    },
    "shop-front": {
      "src": "/images/shop-front.jpg",
      "alt": "De winkel van Shop De Bie"
    },
    "gallery-welkom": {
      "src": "/images/gallery/welkom.jpg",
      "alt": "Welkom bij Shop De Bie"
    },
    "gallery-vestentopper": {
      "src": "/images/gallery/vestentopper.jpg",
      "alt": "Vestentopper"
    },
    "gallery-broekentopper": {
      "src": "/images/gallery/broekentopper.jpg",
      "alt": "Broekentopper"
    },
    "gallery-kolpers": {
      "src": "/images/gallery/kol-en-manchettenpers.jpg",
      "alt": "Kol- en manchettenpers"
    },
    "gallery-hemdentopper": {
      "src": "/images/gallery/hemdentopper.jpg",
      "alt": "Hemdentopper"
    },
    "gallery-voorschuur": {
      "src": "/images/gallery/voorschuurtafel.jpg",
      "alt": "Voorschuurtafel"
    },
    "gallery-strijkster": {
      "src": "/images/gallery/strijkster.jpg",
      "alt": "Een strijkster aan het werk"
    },
    "gallery-wasmachine": {
      "src": "/images/gallery/oude-wasmachine.jpg",
      "alt": "Een oude wasmachine"
    },
    "wassymbolen": {
      "src": "/images/wassymbolen.jpg",
      "alt": "Overzicht van wassymbolen"
    }
  },
  "accessibility": { "pillarsHeading": "Onze troeven" },
  "brand": {
    "mark": "db",
    "facebookLabel": "Facebook"
  }
} as const;

export type HomeContent = typeof home;
