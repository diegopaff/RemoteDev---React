import useActiveId from "../hooks/useActiveId";
import { useItemId } from "../hooks/useItemId";

import BookmarkIcon from "./BookmarkIcon";
import Spinner from "./Spinner";

export default function JobItemContent() {
  const activeId = useActiveId();
  const { jobItemExpanded, isLoading } = useItemId(activeId);

  if (isLoading) {
    return <LoadingContentJob />;
  }

  if (!jobItemExpanded) {
    return <EmptyJobContent />;
  }

  return (
    <section className="job-details">
      {!isLoading && (
        <div>
          <img src={jobItemExpanded.coverImgURL} alt="#" />

          <a
            className="apply-btn"
            href={jobItemExpanded.companyURL}
            target="_blank"
          >
            Apply
          </a>

          <section className="job-info">
            <div className="job-info__left">
              <div className="job-info__badge">
                {jobItemExpanded.badgeLetters}
              </div>
              <div className="job-info__below-badge">
                <time className="job-info__time">
                  {jobItemExpanded.daysAgo}d
                </time>

                <BookmarkIcon id={jobItemExpanded.id} />
              </div>
            </div>

            <div className="job-info__right">
              <h2 className="second-heading">{jobItemExpanded.title}</h2>
              <p className="job-info__company">{jobItemExpanded.company}</p>
              <p className="job-info__description">
                {jobItemExpanded.description}
              </p>
              <div className="job-info__extras">
                <p className="job-info__extra">
                  <i className="fa-solid fa-clock job-info__extra-icon"></i>
                  {jobItemExpanded.duration}
                </p>
                <p className="job-info__extra">
                  <i className="fa-solid fa-money-bill job-info__extra-icon"></i>
                  {jobItemExpanded.salary}
                </p>
                <p className="job-info__extra">
                  <i className="fa-solid fa-location-dot job-info__extra-icon"></i>{" "}
                  {jobItemExpanded.location}
                </p>
              </div>
            </div>
          </section>

          <div className="job-details__other">
            <section className="qualifications">
              <div className="qualifications__left">
                <h4 className="fourth-heading">Qualifications</h4>
                <p className="qualifications__sub-text">
                  Other qualifications may apply
                </p>
              </div>
              <ul className="qualifications__list">
                {jobItemExpanded.qualifications.map((qualification: string) => (
                  <li key={qualification} className="qualifications__item">
                    {qualification}
                  </li>
                ))}
              </ul>
            </section>

            <section className="reviews">
              <div className="reviews__left">
                <h4 className="fourth-heading">Company reviews</h4>
                <p className="reviews__sub-text">
                  Recent things people are saying
                </p>
              </div>
              <ul className="reviews__list">
                {jobItemExpanded.reviews.map((review: string) => (
                  <li key={review} className="reviews__item">
                    {review}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <footer className="job-details__footer">
            <p className="job-details__footer-text">
              If possible, please reference that you found the job on{" "}
              <span className="u-bold">rmtDev</span>, we would really appreciate
              it!
            </p>
          </footer>
        </div>
      )}
    </section>
  );
}

function LoadingContentJob() {
  return (
    <section className="job-details">
      <div>
        <Spinner />
      </div>
    </section>
  );
}

function EmptyJobContent() {
  return (
    <section className="job-details">
      <div>
        <div className="job-details__start-view">
          <p>What are you looking for?</p>
          <p>
            Start by searching for any technology your ideal job is working with
          </p>
        </div>
      </div>
    </section>
  );
}
