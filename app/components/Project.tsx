"use client";
import { useEffect } from "react";
import Link from "next/link";

import { Card, CardBody } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";

import { TechnologyType, ProjectType } from "../types";
import { GithubSVG, LinkSVG } from "./ui/icons";
import ProjectsSectionAnimations from "../utils/ProjectsSectionAnimations";

export const Project = (project: ProjectType) => {
  const {
    description,
    title,
    icon,
    imgUrl,
    videoUrl,
    technologies,
    githubUrl,
    websiteUrl,
  } = project;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches) return ProjectsSectionAnimations.mobileAnimation();

    ProjectsSectionAnimations.titleAnimation();
    ProjectsSectionAnimations.videoAnimation();
    ProjectsSectionAnimations.descriptionAnimation();
    ProjectsSectionAnimations.websiteUrlAnimation();
    ProjectsSectionAnimations.githubUrlAnimation();
  }, []);

  return (
    <div className="grid gap-6 pb-4 overflow-hidden lg:grid-cols-2 lg:items-start">
      <div className="flex lg:hidden items-center text-3xl font-bold text-white opacity-0 mobile-animation titleSection">
        <span className="bg-[#303036] p-2 rounded-md mr-2"> {icon}</span>
        {title}
      </div>

      <div className="opacity-0 mobile-animation videoSection">
        <div className="w-full overflow-hidden rounded-xl border-1 border-[#212121] aspect-video">
          <video
            className="h-full w-full object-cover"
            autoPlay
            loop
            playsInline
            poster={imgUrl}
            src={videoUrl}
          ></video>
        </div>
      </div>

      <Card className="opacity-0 mobile-animation descriptionCard">
        <CardBody className="text-gray-400 text-lg flex flex-col justify-start gap-4">
          <div className="hidden lg:flex text-3xl font-bold text-white opacity-0 mobile-animation titleSection">
            <span className="bg-[#303036] p-2 rounded-md mr-2"> {icon}</span>{" "}
            {title}
          </div>
          {description}
          <div className=" flex flex-wrap gap-2">
            {technologies.map(
              ({ name, icon }: TechnologyType, index: number) => (
                <Chip key={`technology-item-${index}`} size="sm">
                  <span className="flex items-center gap-2">
                    {/* {icon} */}
                    {name}
                  </span>
                </Chip>
              ),
            )}
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-2 gap-4 lg:col-start-2">
        <Card
          isHoverable
          className={`${
            websiteUrl === "NONE" ? "hidden" : "col-span-1"
          } opacity-0 mobile-animation githubUrlCard`}
        >
          <Link
            href={websiteUrl}
            rel="noopener noreferrer"
            target="_blank"
            className="min-h-full flex justify-center items-center"
          >
            <CardBody className="justify-center items-center">
              {!websiteUrl ? (
                <h2 className="font-bold text-xl text-gray-400 text-center">
                  Coming Soon!
                </h2>
              ) : (
                <LinkSVG />
              )}
            </CardBody>
          </Link>
        </Card>

        <Card
          isHoverable
          className={`${
            websiteUrl === "NONE" ? "col-span-2" : "col-span-1"
          } opacity-0 mobile-animation websiteUrlCard`}
        >
          <Link
            href={githubUrl}
            rel="noopener noreferrer"
            target="_blank"
            className="min-h-full flex justify-center items-center"
          >
            <CardBody className="justify-center items-center">
              <GithubSVG />
            </CardBody>
          </Link>
        </Card>
      </div>
    </div>
  );
};
