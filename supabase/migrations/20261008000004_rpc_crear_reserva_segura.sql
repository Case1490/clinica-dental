-- Fase 2.2: RPC que centraliza el cálculo de fecha_inicio/fecha_fin y el insert.
-- La atomicidad contra doble reserva la da el constraint de exclusión
-- (20261008000003_exclusion_doble_reserva.sql): si dos solicitudes concurrentes
-- chocan, PostgreSQL rechaza la segunda con SQLSTATE 23P01 (exclusion_violation),
-- que PostgREST traduce automáticamente a HTTP 409 Conflict en la respuesta.

create or replace function public.crear_reserva_segura(
  p_doctor_id uuid,
  p_nombre text,
  p_email text,
  p_telefono text,
  p_servicio text,
  p_fecha date,
  p_hora text,
  p_mensaje text default null,
  p_duracion_minutos int default 30
)
returns public.reservas
language plpgsql
as $$
declare
  v_inicio timestamptz;
  v_fin timestamptz;
  v_reserva public.reservas;
begin
  if p_doctor_id is null then
    raise exception 'doctor_id es requerido' using errcode = '22023';
  end if;

  v_inicio := (p_fecha::text || ' ' || p_hora)::timestamptz;
  v_fin := v_inicio + make_interval(mins => p_duracion_minutos);

  insert into public.reservas (
    doctor_id, nombre, email, telefono, servicio, fecha, hora, mensaje,
    fecha_inicio, fecha_fin, estado
  ) values (
    p_doctor_id, p_nombre, p_email, p_telefono, p_servicio, p_fecha, p_hora, p_mensaje,
    v_inicio, v_fin, 'Pendiente'
  )
  returning * into v_reserva;

  return v_reserva;
end;
$$;

grant execute on function public.crear_reserva_segura(uuid, text, text, text, text, date, text, text, int) to anon, authenticated;
