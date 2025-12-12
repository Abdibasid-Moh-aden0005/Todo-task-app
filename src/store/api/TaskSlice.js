import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "http://localhost:2004/tasks";

// Async thunk for fetching tasks
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks/addtask",
  async (addTask, { rejectWithValue }) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(addTask),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for editing a task
export const editTask = createAsyncThunk(
  "tasks/editTask",
  async ({ id, updatedTask }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      } else {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for deleting a task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  tasks: [],
  status: "idle",
  error: null,
  isEditing: false,
  editTask: null,
};

export const TaskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setEditingTask: (state, action) => {
      state.isEditing = true;
      state.editTask = action.payload;
    },
    clearEditingTask: (state) => {
      state.isEditing = false;
      state.editTask = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch tasks cases
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Edit task cases
      .addCase(editTask.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.tasks.findIndex(
          (task) =>
            task.id === action.payload.id ||
            String(task.id) === String(action.payload.id)
        );

        state.tasks[index] = action.payload;

        state.error = null;
      })
      .addCase(editTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Add task cases
      .addCase(addTask.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks.push(action.payload);
        state.error = null;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Delete task cases
      .addCase(deleteTask.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setEditingTask, clearEditingTask } = TaskSlice.actions;

export default TaskSlice.reducer;
