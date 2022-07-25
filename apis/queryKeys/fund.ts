export const fundKeys = {
  all: ['funds'] as const,
  lists: () => [...fundKeys.all, 'list'] as const,
  details: () => [...fundKeys.all, 'detail'] as const,
  detail: (id: number) => [...fundKeys.details(), id] as const,
};
