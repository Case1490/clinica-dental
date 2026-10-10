-- Fix: las políticas de reservas/doctores hacían `select user_id from public.admins`
-- dentro de su propio `using (...)`, pero la política de admins (`using (false)`)
-- bloqueaba ese subquery para cualquier rol, incluidos los admins reales — nadie
-- podía leer reservas nunca. Se resuelve con una función SECURITY DEFINER que
-- consulta admins con privilegios elevados, evitando el bloqueo circular de RLS.

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

grant execute on function public.is_admin() to authenticated;

drop policy if exists "reservas_select_admin" on public.reservas;
create policy "reservas_select_admin"
  on public.reservas
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists "reservas_update_admin" on public.reservas;
create policy "reservas_update_admin"
  on public.reservas
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "reservas_delete_admin" on public.reservas;
create policy "reservas_delete_admin"
  on public.reservas
  for delete
  to authenticated
  using (public.is_admin());

drop policy if exists "doctores_write_admin" on public.doctores;
create policy "doctores_write_admin"
  on public.doctores
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());
