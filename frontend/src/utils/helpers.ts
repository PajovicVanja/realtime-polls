// src/utils/helpers.ts

/**
 * Formats a date string or Date object to a more readable format.
 * @param date - A Date object or a date string.
 * @returns A formatted date string.
 */
export function formatDate(date: string | Date): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  
  /**
   * Generates a shareable URL for a given poll ID.
   * @param pollId - The poll's unique identifier.
   * @returns A URL string pointing to the poll page.
   */
  export function generatePollURL(pollId: string): string {
    // Assuming your poll page route is '/poll/:pollId'
    return `${window.location.origin}/poll/${pollId}`;
  }
  