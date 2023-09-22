const functions = require('firebase-functions');

exports.updateProductAverageRating = functions.firestore
  .document('products/{productId}')
  .onWrite(async (change, context) => {
    // Get the product document.
    const productDocument = await change.after.ref.get();

    // Get the reviews array from the product document.
    const reviews = productDocument.data().reviews;

    // Calculate the average rating.
    let averageRating = 0;
    for (const review of reviews) {
      averageRating += review.rating;
    }
    averageRating /= reviews.length;

    // Update the product average rating and number of ratings.
    await productDocument.ref.update({
      averageRating,
      numberOfRatings: reviews.length,
    });
  });
