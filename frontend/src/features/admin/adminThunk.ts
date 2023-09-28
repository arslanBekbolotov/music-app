import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "../../axiosApi";
import { IAdminApi } from "../../types";

export const fetchUnpublishedSubjects = createAsyncThunk(
  "admin/fetch",
  async () => {
    const { data } = await axiosApi<IAdminApi>("unpublished");
    return data;
  },
);
