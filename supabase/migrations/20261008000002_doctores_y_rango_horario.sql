-- Fase 2.1: modelo multi-doctor. Agrega tabla doctores y columnas de rango horario
-- en reservas, necesarias para el constraint anti doble-reserva (siguiente migración).

-- 1. Tabla de doctores.
create table if not exists public.doctores (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  especialidad text,
  activo boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.doctores enable row level security;

create policy "doctores_select_publico"
  on public.doctores
  for select
  to anon, authenticated
  using (activo = true);

create policy "doctores_write_admin"
  on public.doctores
  for all
  to authenticated
  using (auth.uid() in (select user_id from public.admins))
  with check (auth.uid() in (select user_id from public.admins));

-- Precarga con los especialistas publicados en la landing (src/data/landingContent.js).
-- Editar nombre/especialidad aquí si cambian en el contenido del sitio.
insert into public.doctores (nombre, especialidad) values
  ('Dr. Vikram Singh', 'Implantología & Rehabilitación Oral'),
  ('Dra. Camila Vargas', 'Ortodoncia Digital'),
  ('Dr. Mateo Palacios', 'Endodoncia Microscópica')
on conflict do nothing;

-- 2. Columnas nuevas en reservas.
alter table public.reservas
  add column if not exists doctor_id uuid references public.doctores(id),
  add column if not exists fecha_inicio timestamptz,
  add column if not exists fecha_fin timestamptz;

-- 3. Backfill de filas existentes: 30 minutos de duración por defecto.
-- doctor_id queda NULL para reservas históricas (no hay forma de inferirlo);
-- el constraint de exclusión no las considerará en conflicto entre sí.
update public.reservas
set
  fecha_inicio = (fecha::text || ' ' || hora)::timestamptz,
  fecha_fin = (fecha::text || ' ' || hora)::timestamptz + interval '30 minutes'
where fecha_inicio is null
  and fecha is not null
  and hora is not null;
