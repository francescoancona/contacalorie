// Calories per 100g (or 100ml for liquids)
export const FOODS = {
  // Cereali e pane
  'pane': 270,
  'pane integrale': 224,
  'pane bianco': 265,
  'pasta': 350,
  'pasta cotta': 157,
  'pasta integrale': 335,
  'riso': 339,
  'riso cotto': 139,
  'riso integrale': 330,
  'farro': 335,
  'avena': 389,
  'fiocchi di avena': 389,
  'cereali': 376,
  'cornflakes': 357,
  'muesli': 368,
  'fette biscottate': 410,
  'crackers': 430,
  'grissini': 410,
  'pizza': 271,
  'pizza margherita': 271,
  'cous cous': 376,
  'polenta': 83,
  'polenta cotta': 83,
  'orzo': 354,
  'pane di segale': 259,
  'tortilla': 234,

  // Prodotti da forno
  'cornetto': 350,
  'brioche': 380,
  'biscotti': 440,
  'biscotti secchi': 420,
  'wafer': 490,
  'ciambella': 370,
  'muffin': 375,
  'plumcake': 355,
  'croissant': 406,
  'pandoro': 400,
  'panettone': 365,

  // Latticini
  'latte': 61,
  'latte intero': 61,
  'latte parzialmente scremato': 46,
  'latte scremato': 34,
  'latte di soia': 33,
  'yogurt': 61,
  'yogurt magro': 36,
  'yogurt greco': 97,
  'yogurt bianco': 61,
  'mozzarella': 253,
  'ricotta': 146,
  'parmigiano': 392,
  'grana padano': 384,
  'fontina': 343,
  'stracchino': 255,
  'mascarpone': 430,
  'burrata': 285,
  'feta': 264,
  'gorgonzola': 324,
  'provola': 277,
  'scamorza': 334,
  'caciotta': 317,
  'formaggio': 350,
  'panna': 337,
  'panna da cucina': 190,

  // Carni
  'pollo': 165,
  'petto di pollo': 110,
  'coscia di pollo': 185,
  'tacchino': 135,
  'petto di tacchino': 105,
  'manzo': 250,
  'bistecca': 207,
  'vitello': 175,
  'maiale': 242,
  'lonza di maiale': 182,
  'salsiccia': 380,
  'hamburger': 254,
  'agnello': 234,
  'coniglio': 136,
  'wurstel': 290,

  // Salumi
  'prosciutto cotto': 215,
  'prosciutto crudo': 269,
  'bresaola': 151,
  'speck': 338,
  'mortadella': 311,
  'salame': 408,
  'coppa': 330,
  'pancetta': 420,
  'guanciale': 655,

  // Pesce
  'salmone': 208,
  'salmone affumicato': 117,
  'tonno': 184,
  'tonno in scatola': 103,
  'tonno al naturale': 103,
  'merluzzo': 82,
  'orata': 121,
  'branzino': 82,
  'gamberi': 85,
  'cozze': 84,
  'vongole': 74,
  'polpo': 82,
  'calamari': 92,
  'sardine': 208,
  'acciughe': 131,
  'sgombro': 205,
  'baccalà': 74,
  'pesce spada': 121,

  // Uova
  'uovo': 155,
  'uova': 155,
  'albume': 52,
  'tuorlo': 352,

  // Legumi
  'lenticchie': 116,
  'lenticchie cotte': 116,
  'fagioli': 127,
  'fagioli cotti': 127,
  'fagioli in scatola': 90,
  'ceci': 164,
  'ceci cotti': 164,
  'ceci in scatola': 120,
  'piselli': 81,
  'piselli surgelati': 77,
  'tofu': 76,
  'soia': 173,
  'edamame': 121,
  'hummus': 166,

  // Verdure
  'insalata': 17,
  'lattuga': 14,
  'spinaci': 23,
  'spinaci cotti': 35,
  'broccoli': 34,
  'broccoli cotti': 35,
  'zucchina': 17,
  'zucchine': 17,
  'melanzana': 24,
  'melanzane': 24,
  'peperone': 31,
  'peperoni': 31,
  'pomodoro': 18,
  'pomodori': 18,
  'pomodori pelati': 20,
  'cetriolo': 15,
  'cetrioli': 15,
  'carota': 35,
  'carote': 35,
  'funghi': 22,
  'funghi champignon': 22,
  'asparagi': 20,
  'fagiolini': 31,
  'patata': 77,
  'patate': 77,
  'patate lesse': 73,
  'cavolfiore': 25,
  'cavolo': 25,
  'cipolla': 40,
  'aglio': 149,
  'sedano': 16,
  'finocchio': 31,
  'radicchio': 23,
  'rucola': 25,
  'carciofo': 47,
  'carciofi': 47,
  'zucca': 26,
  'mais': 86,
  'mais in scatola': 86,

  // Frutta
  'mela': 52,
  'pera': 57,
  'banana': 89,
  'arancia': 47,
  'kiwi': 61,
  'fragole': 32,
  'uva': 69,
  'anguria': 30,
  'melone': 34,
  'pesca': 39,
  'avocado': 160,
  'mirtilli': 57,
  'ananas': 50,
  'ciliegine': 50,
  'ciliegie': 50,
  'prugne': 46,
  'albicocche': 48,
  'lamponi': 52,
  'more': 43,
  'melograno': 83,
  'limone': 29,
  'pompelmo': 42,
  'mandarino': 53,
  'papaya': 43,
  'mango': 60,
  'fico': 74,
  'fichi': 74,

  // Frutta secca
  'mandorle': 579,
  'noci': 654,
  'anacardi': 553,
  'pistacchi': 562,
  'nocciole': 628,
  'arachidi': 567,
  'pinoli': 673,
  'semi di girasole': 584,
  'semi di zucca': 559,

  // Condimenti e oli
  'olio': 884,
  'olio di oliva': 884,
  'olio extravergine': 884,
  'burro': 717,
  'maionese': 680,
  'ketchup': 112,
  'senape': 66,
  'aceto': 21,
  'aceto balsamico': 88,
  'salsa di soia': 53,

  // Dolci e snack
  'cioccolato': 546,
  'cioccolato fondente': 598,
  'cioccolato al latte': 535,
  'nutella': 539,
  'miele': 304,
  'marmellata': 260,
  'gelato': 207,
  'gelato alla crema': 207,
  'patatine': 536,
  'chips': 536,
  'popcorn': 375,
  'torta': 340,
  'crostata': 346,
  'tiramisù': 280,
  'panna cotta': 216,
  'budino': 115,
  'merendina': 380,

  // Bevande
  'caffè': 2,
  'tè': 1,
  'succo di arancia': 45,
  'succo di frutta': 48,
  'acqua': 0,
  'latte di mandorla': 24,
  'latte di riso': 47,
  'coca cola': 42,
  'aranciata': 40,
  'birra': 43,
  'vino': 85,
  'vino rosso': 85,
  'vino bianco': 77,
  'spritz': 60,

  // Piatti pronti / condimenti tipici
  'ragù': 150,
  'besciamella': 130,
  'pesto': 454,
  'sugo al pomodoro': 50,
  'brodo': 15,
  'minestra': 45,
  'minestrone': 55,
};

export const DEFAULT_PORTIONS = {
  'caffè': 150,
  'tè': 200,
  'acqua': 250,
  'uovo': 60,
  'uova': 60,
  'cornetto': 80,
  'brioche': 80,
  'mela': 150,
  'pera': 150,
  'banana': 120,
  'arancia': 150,
  'kiwi': 80,
  'pesca': 130,
  'prugne': 50,
  'albicocche': 40,
  'fetta biscottata': 10,
  'fette biscottate': 20,
  'crackers': 25,
  'grissini': 30,
  'ciambella': 50,
  'muffin': 80,
};

export function searchFood(query) {
  if (!query) return null;
  const q = query.toLowerCase().trim();

  // 1. Exact match
  if (FOODS[q] !== undefined) {
    return { name: q, caloriesPer100g: FOODS[q] };
  }

  // 2. Starts with query
  for (const [key, cal] of Object.entries(FOODS)) {
    if (key.startsWith(q)) {
      return { name: key, caloriesPer100g: cal };
    }
  }

  // 3. Query is contained in key
  for (const [key, cal] of Object.entries(FOODS)) {
    if (key.includes(q)) {
      return { name: key, caloriesPer100g: cal };
    }
  }

  // 4. Key is contained in query
  // Sort by key length descending to prefer longer (more specific) matches
  const sortedKeys = Object.keys(FOODS).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (q.includes(key)) {
      return { name: key, caloriesPer100g: FOODS[key] };
    }
  }

  return null;
}
