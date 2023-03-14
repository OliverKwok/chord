export interface PdfList {
  name: string;
  children: PdfList[];
}

export interface Student {
  id: number;
  name: string;
  birthdy?: string;
  level?: string;
  school?: string;
  phone?: string;
  phone_relation?: string;
  phone2?: string;
  phone2_relation?: string;
  estate?: string;
  remark?: string;
  is_quitted?: string;
  gender?: string;
}

export interface PrintRecord {
  student_id: number;
  print_file_name: string;
}

export interface StudentListState {
  studentList: Student[];
  updateStudentList: (newStudentList: Student[]) => void;
}
