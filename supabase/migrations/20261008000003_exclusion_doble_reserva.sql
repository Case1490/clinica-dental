-- Fase 2.1: constraint de exclusión a nivel de PostgreSQL. Esta es la única
-- garantía real contra doble reserva bajo concurrencia: es atómica y la aplica
-- el motor de la base de datos, no el cliente ni la Edge Function.

create extension if not exists btree_gist;

alter table public.reservas
  alter column estado set default 'Pendiente';

update public.reservas set estado = 'Pendiente' where estado is null;

alter table public.reservas
  alter column estado set not null;

alter table public.reservas drop constraint if exists no_solapamiento_horario;

alter table public.reservas
  add constraint no_solapamiento_horario
  exclude using gist (
    doctor_id with =,
    tstzrange(fecha_inicio, fecha_fin) with &&
  ) where (estado <> 'Cancelada' and doctor_id is not null);
