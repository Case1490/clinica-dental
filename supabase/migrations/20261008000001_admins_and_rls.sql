-- Fase 1.1: Autenticación admin + RLS de la tabla reservas.
-- Aplicar en el SQL Editor de Supabase (Dashboard > SQL Editor) o vía `supabase db push`.

-- 1. Tabla de administradores: vincula usuarios de Supabase Auth con el rol admin.
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

-- Nadie puede leer/escribir la tabla admins desde el cliente; solo Service Role.
create policy "admins_no_client_access"
  on public.admins
  for all
  using (false)
  with check (false);

-- 2. RLS de reservas.
alter table public.reservas enable row level security;

drop policy if exists "reservas_insert_publico" on public.reservas;
create policy "reservas_insert_publico"
  on public.reservas
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "reservas_select_admin" on public.reservas;
create policy "reservas_select_admin"
  on public.reservas
  for select
  to authenticated
  using (auth.uid() in (select user_id from public.admins));

drop policy if exists "reservas_update_admin" on public.reservas;
create policy "reservas_update_admin"
  on public.reservas
  for update
  to authenticated
  using (auth.uid() in (select user_id from public.admins))
  with check (auth.uid() in (select user_id from public.admins));

drop policy if exists "reservas_delete_admin" on public.reservas;
create policy "reservas_delete_admin"
  on public.reservas
  for delete
  to authenticated
  using (auth.uid() in (select user_id from public.admins));

-- 3. Alta del primer administrador (ejecutar manualmente después de crear el usuario
--    en Authentication > Users en el dashboard de Supabase):
-- insert into public.admins (user_id) values ('<uuid-del-usuario>');
