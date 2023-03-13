import {create} from 'zustand';
import {StudentListState} from '../type/app';

export const useStudentListStore = create<StudentListState>(set => ({
  studentList: [],
  updateStudentList: newStudentList => set({studentList: newStudentList}),
}));
