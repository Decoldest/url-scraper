import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { scrapeWebsite, analyzeContent } from "../services/api";

export const scrapeUrl = createAsyncThunk("scraper/scrapeUrl", async (url) => {
  const response = await scrapeWebsite(url);
  return response;
});

export const analyzeWebsite = createAsyncThunk(
  "scraper/analyzeWebsite",
  async ({ content, instructions }) => {
    const response = await analyzeContent(content, instructions);
    return response;
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
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAnalysis: (state) => {
      state.analysis = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(scrapeUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(scrapeUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload.content;
        state.error = null;
      })
      .addCase(scrapeUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to scrape website';
      })
      .addCase(analyzeWebsite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(analyzeWebsite.fulfilled, (state, action) => {
        state.loading = false;
        state.analysis = action.payload.result;
        state.error = null;
      })
      .addCase(analyzeWebsite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to analyze content';
      });
  },
});

export const { clearError, clearAnalysis } = scraperSlice.actions;
export default scraperSlice.reducer;
