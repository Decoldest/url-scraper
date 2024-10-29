import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { scrapeWebsite, analyzeContent } from "../services/api";

export const scrapeUrl = createAsyncThunk("scraper/scrapeUrl", async (url) => {
  const response = await scrapeWebsite(url);
  return response.data;
});

export const analyzeWebsite = createAsyncThunk(
  "scraper/analyzeWebsite",
  async ({ content, instructions }) => {
    const response = await analyzeContent(content, instructions);
    return response.data;
  },
);

const scraperSlice = createSlice({
  name: "scraper",
  initialState: {
    content: null,
    analysis: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(scrapeUrl.pending, (state) => {
        state.loading = true;
      })
      .addCase(scrapeUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload.content;
      })
      .addCase(scrapeUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(analyzeWebsite.pending, (state) => {
        state.loading = true;
      })
      .addCase(analyzeWebsite.fulfilled, (state, action) => {
        state.loading = false;
        state.analysis = action.payload.result;
      })
      .addCase(analyzeWebsite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default scraperSlice.reducer;
