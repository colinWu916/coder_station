import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getType } from "../api/type.js";

export const getTypeList = createAsyncThunk(
  "type/getTypeList",
  async () => {
    const response = await getType();
    // 填充返回的数据到状态仓库
    return response.data;
  }
);

const typeSlice = createSlice({
  name: "type",
  initialState: {
    typeList: [], // 存储所有的类型
  },
  reducers: {
    // 你可以在这里添加其他的同步 reducers
  },
  // 专门处理异步的 reducer
  extraReducers: (builder) => {
    builder
      .addCase(getTypeList.fulfilled, (state, { payload }) => {
        // 处理 fulfilled 状态，填充数据
        state.typeList = payload;
      })
  }
});

export default typeSlice.reducer;