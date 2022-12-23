export function createImagesMarkup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <div class="photo-card">
    <a   href="${largeImageURL}" rel="noopener noreferrer nofollow">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
        <p class="info-item">
            <b>Likes</b>
            <span>${likes}</span>
        </p>
        <p class="info-item">
            <b>Views</b>
            <span>${views}</span>
        </p>
        <p class="info-item">
            <b>Comments</b>
            <span>${comments}</span>
        </p>
        <p class="info-item">
            <b>Downloads</b>
            <span>${downloads}</span>
        </p>
    </div>
</div>
  `
    )
    .join('');
}

// export function createImagesMarkup(images) {
//   return images
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => `
//     <div class="photo-card">
//     <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//     <div class="info">
//         <p class="info-item">
//             <b>Likes</b>
//             <span>${likes}</span>
//         </p>
//         <p class="info-item">
//             <b>Views</b>
//             <span>${views}</span>
//         </p>
//         <p class="info-item">
//             <b>Comments</b>
//             <span>${comments}</span>
//         </p>
//         <p class="info-item">
//             <b>Downloads</b>
//             <span>${downloads}</span>
//         </p>
//     </div>
// </div>
//   `
//     )
//     .join('');
// }
