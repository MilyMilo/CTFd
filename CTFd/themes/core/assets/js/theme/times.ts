import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";

// TODO: CTFd 4.0 consider removing dayjs advancedFormat
dayjs.extend(advancedFormat);

export const intl = new Intl.DateTimeFormat(
  localStorage.getItem("language") || navigator.language,
  {
    dateStyle: "long",
    timeStyle: "short",
  },
);

export default () => {
  document.querySelectorAll<HTMLElement>("[data-time]").forEach($el => {
    const time = $el.getAttribute("data-time")!;
    const format = $el.getAttribute("data-time-format");

    $el.innerText = format ? dayjs(time).format(format) : intl.format(new Date(time));
  });
};
