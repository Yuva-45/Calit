import { tools, ToolMetadata } from "../registry";
import { KEYWORD_TOOL_PATH_MAP, getMappedToolPath, normalizeSearchKey } from "./searchMappings";

export { KEYWORD_TOOL_PATH_MAP, getMappedToolPath };

export interface SearchMatchResult {
  tool: ToolMetadata;
  score: number;
  isDirectMatch: boolean;
  matchedOn: string;
  directPath: string;
}

/**
 * Normalizes search text for resilient keyword and phrase matching
 */
export function normalizeQuery(text: string): string {
  return normalizeSearchKey(text);
}

/**
 * Evaluates user search query against all tools and maps directly to tool paths
 * with direct suggestions and high-precision relevance scoring.
 */
export function matchTools(rawQuery: string): SearchMatchResult[] {
  const query = normalizeQuery(rawQuery);
  if (!query) return [];

  const directMappedPath = getMappedToolPath(query);
  const queryWords = query.split(" ").filter(w => w.length > 0);
  const cleanIntent = query
    .replace(/^(how\s+to\s+calculate|how\s+to\s+convert|calculate|convert|check|find|get|the|tool|calculator|converter)\s+/i, "")
    .trim();

  const results: SearchMatchResult[] = [];

  for (const tool of tools) {
    const toolNameNorm = normalizeQuery(tool.name);
    const slugNorm = normalizeQuery(tool.slug.replace(/-/g, " "));
    const routeNorm = normalizeQuery(tool.route);
    const descNorm = normalizeQuery(tool.description);
    const categoryNorm = normalizeQuery(tool.category.replace(/-/g, " "));

    let score = 0;
    let matchedOn = "Description";
    let isDirectMatch = false;

    // 0. Exact keyword-to-path mapping hit (Highest Priority)
    if (directMappedPath && tool.route === directMappedPath) {
      score += 200;
      matchedOn = `Keyword Mapping ("${query}" → ${directMappedPath})`;
      isDirectMatch = true;
    }

    // 1. Exact query match with tool route or slug (e.g., "/converters/kg-to-lbs" or "kg-to-lbs")
    else if (query === tool.slug || query === tool.route || routeNorm.includes(query)) {
      score += 150;
      matchedOn = "Direct Route";
      isDirectMatch = true;
    }

    // 2. Exact match with Tool Name
    else if (toolNameNorm === query) {
      score += 130;
      matchedOn = "Exact Name";
      isDirectMatch = true;
    }

    // 3. Exact match with any defined keyword / alias phrase
    else {
      for (const kw of tool.keywords) {
        const kwNorm = normalizeQuery(kw);
        if (kwNorm === query || kwNorm === cleanIntent) {
          score += 115;
          matchedOn = `Exact Keyword "${kw}"`;
          isDirectMatch = true;
          break;
        } else if (query.startsWith(kwNorm) || kwNorm.startsWith(query)) {
          score += 85;
          matchedOn = `Keyword "${kw}"`;
          if (query.length >= 3) isDirectMatch = true;
          break;
        } else if (kwNorm.includes(query) || (cleanIntent && kwNorm.includes(cleanIntent))) {
          score += 70;
          matchedOn = `Keyword "${kw}"`;
          break;
        }
      }
    }

    // 4. Starts with tool name or slug
    if (!isDirectMatch) {
      if (toolNameNorm.startsWith(query) || slugNorm.startsWith(query)) {
        score += 80;
        matchedOn = "Tool Name Prefix";
        isDirectMatch = query.length >= 3;
      } else if (toolNameNorm.includes(query)) {
        score += 65;
        matchedOn = "Tool Name";
      } else if (slugNorm.includes(query)) {
        score += 60;
        matchedOn = "Tool Slug";
      }
    }

    // 5. Word-by-word intersection matching
    if (queryWords.length > 1 && score < 100) {
      let matchedWords = 0;
      for (const word of queryWords) {
        if (
          toolNameNorm.includes(word) ||
          slugNorm.includes(word) ||
          tool.keywords.some(k => normalizeQuery(k).includes(word))
        ) {
          matchedWords++;
        }
      }

      if (matchedWords === queryWords.length) {
        score += 55;
        if (!isDirectMatch && score >= 70) {
          isDirectMatch = true;
        }
      } else if (matchedWords > 0) {
        score += matchedWords * 12;
      }
    }

    // 6. Category match
    if (categoryNorm === query || categoryNorm.startsWith(query)) {
      score += 30;
      if (matchedOn === "Description") matchedOn = "Category";
    }

    // 7. Description match
    if (descNorm.includes(query)) {
      score += 20;
    }

    if (score > 0) {
      results.push({
        tool,
        score,
        isDirectMatch,
        matchedOn,
        directPath: tool.route
      });
    }
  }

  // Sort results descending by score
  return results.sort((a, b) => b.score - a.score);
}

