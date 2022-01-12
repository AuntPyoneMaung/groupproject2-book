const { Reviews } = require("../connect.js");

module.exports = {

  addReview: async (userid, indexid, rev) => {

    let result = {
      message: null,
      status: null,
      data: null,
    };

    const review = await Reviews.findOne({
      where: {
        indexId: indexid,
        userId: userid
      }
    });

    console.log(review);
    if (review && rev === review.review) {
      result.message = `Bad request: Duplicate entry for review`;
      result.status = 400;
      return result;
    }

    if (rev !== review.review) {
      review.review = rev;
    }

    if (review === null) { //new user and new book add review
      const newEntry = await Reviews.create({
        indexId: indexid,
        userId: userid,
        review: rev
      })

      result.data = newEntry;
      result.status = 200;
      result.message = `Review added for book index ${indexid} by user id ${userid}`;
      return result;
    }


    await review.save();
    result.data = review;
    result.status = 200;
    result.message = `Review edited for book index ${indexid} by user id ${userid}`;
    return result;

  }
};

/*
[
  [
    {
      "reviewId": 1,
      "review": "Lots of suspense and mystery, a fascinating read.",
      "userId": 1,
      "indexId": 2,
      "createdAt": null,
      "updatedAt": null
    },
    {
      "reviewId": 2,
      "review": "I am looking forward to the sequel!",
      "userId": 2,
      "indexId": 1,
      "createdAt": null,
      "updatedAt": null
    }
  ]
]
{
"rev":"NO SEQUELS NEEDEDED!",
"userId":2,
"indexId":1
}
*/

