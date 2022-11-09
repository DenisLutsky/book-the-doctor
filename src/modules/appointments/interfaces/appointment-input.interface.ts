export interface IAppointmentInput {
  date: string;
  doctorId: string;
  patientId: string;
  isActive?: boolean;
  isDeleted?: boolean;
}
