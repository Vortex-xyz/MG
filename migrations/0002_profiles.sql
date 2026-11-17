create table if not exists profiles (
  id text primary key,
  user_id text unique,
  display_name text not null,
  gender text not null,
  age integer not null,
  city text not null,
  state text not null,
  caste text not null,
  rashi text not null,
  nakshatra text not null,
  jataka text,
  about text,
  education text,
  profession text,
  photo_key text not null,
  sample boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_caste_idx on profiles (caste);
create index if not exists profiles_rashi_idx on profiles (rashi);
create index if not exists profiles_nakshatra_idx on profiles (nakshatra);
create index if not exists profiles_state_idx on profiles (state);

create table if not exists circle_requests (
  user_id text primary key,
  created_at timestamptz not null default now()
);

insert into profiles (
  id, user_id, display_name, gender, age, city, state, caste, rashi, nakshatra,
  jataka, about, education, profession, photo_key, sample, created_at
) values
  (
    'mock-ananya', null, 'Ananya Subramanian', 'woman', 28, 'Bengaluru', 'Karnataka', 'Iyer', 'Simha', 'Magha',
    'Born 14 April 1998 at 6:12 in the morning, Bengaluru. The family holds the chart.',
    'Studies economics and works as a research associate. Evenings are music and long walks.',
    'M.A. Economics', 'Research associate', 'ananya', true, now() - interval '20 days'
  ),
  (
    'mock-karthik', null, 'Karthik Reddy', 'man', 31, 'Hyderabad', 'Telangana', 'Reddy', 'Vrishabha', 'Rohini',
    null,
    'Builds software for irrigation cooperatives. Visits his parents most Sundays.',
    'B.Tech', 'Software engineer', 'karthik', true, now() - interval '18 days'
  ),
  (
    'mock-meera', null, 'Meera Nair', 'woman', 27, 'Kochi', 'Kerala', 'Nair', 'Kanya', 'Hasta',
    'Born 2 September 1999, just after noon, Kochi.',
    'Teaches literature and keeps a small library. Prefers a quieter social life than her cousins expect.',
    'M.A. English', 'Lecturer', 'meera', true, now() - interval '16 days'
  ),
  (
    'mock-arjun', null, 'Arjun Gowda', 'man', 30, 'Mysuru', 'Karnataka', 'Vokkaliga', 'Mesha', 'Ashwini',
    null,
    'Runs a family supply shop with his elder brother. Would like a household that can visit Mysuru often.',
    'B.Com', 'Shop partner', 'arjun', true, now() - interval '14 days'
  ),
  (
    'mock-divya', null, 'Divya Chettiar', 'woman', 29, 'Chennai', 'Tamil Nadu', 'Chettiar', 'Tula', 'Swati',
    'Born 21 October 1997 at 4:40 in the morning, Madurai. Raised in Chennai.',
    'Architect in a small studio. Hopes to stay in Tamil Nadu.',
    'B.Arch', 'Architect', 'divya', true, now() - interval '12 days'
  ),
  (
    'mock-rohan', null, 'Rohan Kulkarni', 'man', 33, 'Pune', 'Maharashtra', 'Brahmin', 'Dhanu', 'Mula',
    'Born 8 December 1993 in the evening, Pune. The chart is shared when families meet.',
    'Chartered accountant. Lives with his mother and is serious about a household.',
    'C.A.', 'Chartered accountant', 'rohan', true, now() - interval '10 days'
  ),
  (
    'mock-lakshmi', null, 'Lakshmi Shetty', 'woman', 26, 'Mangaluru', 'Karnataka', 'Bunt', 'Mithuna', 'Ardra',
    null,
    'Hospital dietitian. Close to her parents and a younger sister. Hopes to stay on the coast.',
    'M.Sc. Nutrition', 'Dietitian', 'lakshmi', true, now() - interval '8 days'
  ),
  (
    'mock-vivek', null, 'Vivek Iyengar', 'man', 32, 'Coimbatore', 'Tamil Nadu', 'Iyengar', 'Makara', 'Shravana',
    'Born 18 January 1994 at dawn, Coimbatore.',
    'Teaches mathematics. The family is observant and unhurried about a match.',
    'M.Sc. Mathematics', 'College lecturer', 'vivek', true, now() - interval '6 days'
  ),
  (
    'mock-sneha', null, 'Sneha Hiremath', 'woman', 30, 'Bengaluru', 'Karnataka', 'Lingayat', 'Karka', 'Pushya',
    null,
    'Product designer who moved for work and would like the household in Bengaluru.',
    'B.Des', 'Product designer', 'sneha', true, now() - interval '4 days'
  )
on conflict (id) do nothing;
