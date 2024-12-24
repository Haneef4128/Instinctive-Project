import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
  const response = await axios.get('/api/data');
  return response.data;
});

export const addStudent = createAsyncThunk('students/addStudent', async (newStudent) => {
  const response = await axios.post('/api/data', newStudent, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
});

export const updateStudent = createAsyncThunk('students/updateStudent', async (updatedStudent) => {
  const response = await axios.put(`/api/${updatedStudent.id}`, updatedStudent, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
});

export const deleteStudent = createAsyncThunk('students/deleteStudent', async (studentId) => {
  await axios.delete(`/api/${studentId}`);
  return studentId;
});

const studentsSlice = createSlice({
  name: 'students',
  initialState: {
    students: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex(student => student.id === action.payload.id);
        state.students[index] = action.payload;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(student => student.id !== action.payload);
      });
  },
});

export default studentsSlice.reducer;