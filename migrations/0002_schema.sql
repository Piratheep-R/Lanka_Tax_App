-- LankaTax per-user data. user_id is TEXT to match Better Auth / preview ids.
create table if not exists profiles (
  user_id text primary key,
  display_name text,
  taxpayer_type text not null default 'salaried',
  monthly_income integer not null default 0,
  other_income integer not null default 0,
  has_rental boolean not null default false,
  has_business boolean not null default false,
  has_investments boolean not null default false,
  has_solar boolean not null default false,
  tin text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists saved_documents (
  id serial primary key,
  user_id text not null,
  document_id text not null,
  created_at timestamptz not null default now(),
  unique (user_id, document_id)
);
create index if not exists saved_documents_user_id_idx on saved_documents (user_id);

create table if not exists advisor_messages (
  id serial primary key,
  user_id text not null,
  role text not null,
  content text not null,
  created_at timestamptz not null default now()
);
create index if not exists advisor_messages_user_id_idx on advisor_messages (user_id, created_at);
