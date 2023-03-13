export interface PdfList {
  name: string;
  children: PdfList[];
}

export interface Student {
  id: number;
  name: string;
}

export interface PrintRecord {
  student_id: number;
  print_file_name: string;
}

export interface StudentListState {
  studentList: Student[];
  updateStudentList: (newStudentList: Student[]) => void;
}
