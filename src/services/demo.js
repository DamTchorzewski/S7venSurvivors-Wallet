import { nanoid } from 'nanoid';

// Demo mode: a local user whose transactions live only in this browser's localStorage.
// The shapes are the ones the API returns, so the rest of the app does not know the difference.

const STORAGE_KEY = 'pfm-demo-transactions';

export const DEMO_TOKEN = 'demo';
export const DEMO_USER = { username: 'Demo', email: 'demo@example.com' };

const pad = n => String(n).padStart(2, '0');

const dateDaysAgo = days => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return {
    day: pad(d.getDate()),
    month: pad(d.getMonth() + 1),
    year: String(d.getFullYear()),
  };
};

// [days ago, type, category, comment, sum]
const SAMPLE = [
  [2, '-', 'Products', 'Groceries', '86.40'],
  [4, '-', 'Car', 'Fuel', '210.00'],
  [6, '+', 'Income', 'Freelance project', '1800.00'],
  [9, '-', 'Leisure', 'Cinema tickets', '64.00'],
  [12, '-', 'Household products', 'Cleaning supplies', '47.90'],
  [15, '-', 'Self care', 'Haircut', '90.00'],
  [19, '-', 'Education', 'Online course', '149.00'],
  [24, '+', 'Income', 'Salary', '5200.00'],
  [28, '-', 'Main expenses', 'Rent', '1900.00'],
  [33, '-', 'Entertainment', 'Concert', '180.00'],
  [41, '-', 'Products', 'Groceries', '132.25'],
  [47, '-', 'Other expenses', 'Gift', '75.00'],
  [55, '+', 'Income', 'Salary', '5200.00'],
  [60, '-', 'Main expenses', 'Rent', '1900.00'],
];

const byDateDesc = (a, b) =>
  `${b.date.year}${b.date.month}${b.date.day}`.localeCompare(
    `${a.date.year}${a.date.month}${a.date.day}`
  );

const save = items => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  return items;
};

export const resetDemoTransactions = () =>
  save(
    SAMPLE.map(([days, type, category, comment, sum]) => ({
      _id: nanoid(),
      type,
      category,
      date: dateDaysAgo(days),
      comment,
      sum,
      owner: 'demo',
    }))
  );

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // a broken value is replaced by the sample data below
  }
  return resetDemoTransactions();
};

export const demoTransactions = {
  list: () => load().sort(byDateDesc),

  create: body => {
    const item = { ...body, _id: nanoid(), owner: 'demo' };
    save([item, ...load()]);
    return item;
  },

  update: (id, body) => {
    const items = load();
    const i = items.findIndex(({ _id }) => _id === id);
    if (i < 0) throw new Error('Not found');
    const fields = { ...body };
    delete fields.id;
    items[i] = { ...items[i], ...fields };
    save(items);
    return items[i];
  },

  remove: id => {
    const items = load();
    const i = items.findIndex(({ _id }) => _id === id);
    if (i < 0) throw new Error('Not found');
    const [removed] = items.splice(i, 1);
    save(items);
    return removed;
  },
};
