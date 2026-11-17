alter table profiles add column if not exists photo_close text;
alter table profiles add column if not exists photo_full text;

create table if not exists photo_grants (
  user_id text primary key,
  granted_at timestamptz not null default now()
);
