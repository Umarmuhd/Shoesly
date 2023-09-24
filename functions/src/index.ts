/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import * as admin from 'firebase-admin';
import type * as firestore from 'firebase-admin/firestore';
import * as functions from 'firebase-functions';

admin.initializeApp();

exports.updateProductAverageRating = functions.firestore
  .document('products/{productId}')
  .onWrite(async (change, _context) => {
    // Get the product document.
    const productDocument = await change.after.ref.get();

    // Get the reviews array from the product document.
    const reviews: firestore.DocumentData[] = productDocument.data()?.reviews;

    if (!reviews) {
      console.log('No reviews found for product');
      return null;
    }

    // Calculate the average rating.
    let averageRating = 0;
    for (const review of reviews) {
      averageRating += review.rating;
    }
    averageRating /= reviews.length;

    // Update the product average rating and number of ratings.
    await productDocument.ref.update({
      avg_rating: averageRating,
      num_of_reviews: reviews.length,
    });
  });
