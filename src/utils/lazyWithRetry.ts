import { lazy, ComponentType } from 'react';

/**
 * lazyWithRetry: Wraps React.lazy to auto-recover when dynamic chunks fail to load
 * due to a new deployment on Vercel (stale chunk hash error).
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  componentImport: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    const pageHasBeenRefreshed = JSON.parse(
      window.sessionStorage.getItem('profile_chunk_retry_refreshed') || 'false'
    );

    try {
      const component = await componentImport();
      window.sessionStorage.setItem('profile_chunk_retry_refreshed', 'false');
      return component;
    } catch (error: any) {
      console.warn('LGI Core: Dynamic chunk load failed (likely new deployment):', error);

      const isChunkError =
        error?.message?.includes('Failed to fetch dynamically imported module') ||
        error?.message?.includes('error loading dynamically imported module') ||
        error?.message?.includes('Importing a module script failed') ||
        error?.name === 'ChunkLoadError';

      if (!pageHasBeenRefreshed && isChunkError) {
        window.sessionStorage.setItem('profile_chunk_retry_refreshed', 'true');
        window.location.href =
          window.location.pathname +
          (window.location.search ? window.location.search + '&' : '?') +
          'v=' +
          Date.now();
        return new Promise<{ default: T }>(() => {});
      }

      throw error;
    }
  });
}

export default lazyWithRetry;
