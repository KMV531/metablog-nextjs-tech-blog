"use client";

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";

export default function SocialShareButtons({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  return (
    <div className="mt-6">
      <h4 className="text-[#181A2A] text-lg lg:text-xl dark:text-white font-bold mb-3">
        Got something out of this? Don&apos;t keep it to yourself—share it with
        someone else who will too!
      </h4>
      <div className="flex space-x-3">
        <FacebookShareButton url={url} title={title}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={url} title={title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <WhatsappShareButton url={url} title={title}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <LinkedinShareButton url={url} title={title}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </div>
    </div>
  );
}
