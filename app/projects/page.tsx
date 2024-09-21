import { Badge } from "@/components/ui/badge";
import { Github, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PROJECTS = [
  {
    name: "Zipit",
    duration: "April 2024",
    description:
      "A seamless file-sharing platform built with Next.js 14, Supabase's real-time API, and Uploadthing, enabling easy and high-quality file transfers without signups. This project enhanced my skills in real-time functionalities, cron jobs, and software testing.",
    techStack: [
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "Supabase Realtime",
      "Cron Jobs",
      "Prisma",
      "Uploadthing",
      "Zod",
      "JSZip",
    ],
    links: [
      {
        name: "Website",
        href: "https://justzipit.vercel.app",
        icon: <Globe className="size-3" />,
      },
      {
        name: "Source",
        href: "https://github.com/actuallyakshat/zipit",
        icon: <Github className="size-3" />,
      },
    ],
    image: "zipit.png",
  },

  {
    name: "Wishly",
    duration: "April 2024",
    description:
      "A reminder app designed to help you remember special occasions like birthdays and anniversaries by sending automatic email notifications. With customizable reminder frequencies, group email support, and event categorization, Wishly combines convenience with a sleek, minimalist UI for seamless event management.",
    techStack: [
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "Prisma",
      "Clerk Auth",
      "Cron Jobs",
      "Nodemailer",
      "PostgreSQL",
      "Moment.js",
    ],
    links: [
      {
        name: "Website",
        href: "https://wishly.vercel.app",
        icon: <Globe className="size-3" />,
      },
      {
        name: "Source",
        href: "https://github.com/actuallyakshat/wishly",
        icon: <Github className="size-3" />,
      },
    ],
    image: "wishly.png",
  },
  {
    name: "Nota Rapida",
    duration: "July 2024",
    description:
      "A minimalist, visually appealing note-taking app designed to replace the complexity of Notion, improving daily workflow with simplicity and ease of use. It also features a desktop variant for Windows, built using Electron.js for a native application feel.",
    techStack: [
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "PostgreSQL",
      "BlockNoteJS",
      "Prisma",
    ],
    links: [
      {
        name: "Website",
        href: "https://nota-rapida.vercel.app",
        icon: <Globe className="size-3" />,
      },
      {
        name: "Source",
        href: "https://github.com/actuallyakshat/nota-rapida",
        icon: <Github className="size-3" />,
      },
    ],
    image: "nr.png",
  },
  {
    name: "Chat GPT Bookmarks",
    duration: "July 2024",
    description:
      "A Chrome extension that allows users to bookmark and easily access important ChatGPT conversations, ensuring key discussions are never lost among other chats. Built in just an hour to solve the frustration of losing track of valuable conversations.",
    techStack: ["Plasmo", "Tailwind CSS", "TypeScript", "React"],
    links: [
      {
        name: "Website",
        href: "https://chromewebstore.google.com/detail/chat-gpt-bookmarks/emlidbpgkfapekklkbdlpmbflanejkll?hl=en",
        icon: <Globe className="size-3" />,
      },
      {
        name: "Source",
        href: "#",
        icon: <Github className="size-3" />,
      },
    ],
    image: "chatgptbookmarks.png",
  },
  {
    name: "Surf Track",
    duration: "July 2024",
    description:
      "Surf Track is a productivity extension designed to help you monitor and manage your online activity. By tracking the time you spend on various websites, Surf Track provides valuable insights into your browsing habits, empowering you to make informed decisions about how you spend your time online.",
    techStack: ["Plasmo", "Tailwind CSS", "TypeScript", "React"],
    links: [
      {
        name: "Website",
        href: "https://chromewebstore.google.com/detail/surf-track/injkidbnadfahmbcimpejmncnmogeoid",
        icon: <Globe className="size-3" />,
      },
      {
        name: "Source",
        href: "#",
        icon: <Github className="size-3" />,
      },
    ],
    image: "surftrack.png",
  },
  {
    name: "Cinevault",
    duration: "March 2024",
    description:
      "A digital library for movies and TV shows, allowing users to save recommendations, track favorites, and write personal reviews. Built with Next.js 14, it features search, watchlists, reviews, and a sleek, responsive UI.",
    techStack: [
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "TMDB API",
      "Clerk Auth",
      "Axios",
      "Prisma",
      "PostgreSQL",
    ],
    links: [
      {
        name: "Website",
        href: "https://cinevault-app.vercel.app",
        icon: <Globe className="size-3" />,
      },
      {
        name: "Source",
        href: "https://github.com/actuallyakshat/cinevault",
        icon: <Github className="size-3" />,
      },
    ],
    image: "cinevault.png",
  },
  {
    name: "Movie Mate",
    duration: "February 2024",
    description:
      "A social platform for cinephiles to connect, search for movies, and find like-minded movie mates. With a built-in chat and customizable profiles, Movie Mate fosters a seamless, interactive movie-loving community.",
    techStack: [
      "Clerk Auth",
      "Tailwind CSS",
      "React",
      "MongoDB",
      "Express.js",
      "Nodemailer",
      "Axios",
      "Jotai",
      "React Hook Form",
      "Firebase (Realtime)",
      "Cloudinary",
    ],
    links: [
      {
        name: "Website",
        href: "https://moviemate-app.vercel.app/",
        icon: <Globe className="size-3" />,
      },
      {
        name: "Source",
        href: "https://github.com/actuallyakshat/moviemate",
        icon: <Github className="size-3" />,
      },
    ],
    image: "moviemate.png",
  },
  {
    name: "Study Snap",
    duration: "March 2024 - May 2024",
    description:
      "A productivity platform for students to track study hours, manage notes, use Pomodoro timers, and organize to-do lists with rearrangeable tasks. Built from scratch, it enhanced my skills in React, Framer Motion, Tiptap, and various auth services like Auth0 and Clerk.",
    techStack: [
      "React",
      "Express.js",
      "MongoDB",
      "Recharts",
      "Jotai",
      "Axios",
      "Framer Motion",
      "Tiptap",
      "Excalidraw API",
    ],
    links: [
      {
        name: "Website",
        href: "https://studysnap.in",
        icon: <Globe className="size-3" />,
      },
      {
        name: "Source",
        href: "https://github.com/actuallyakshat/Study-Snap",
        icon: <Github className="size-3" />,
      },
    ],
    image: "studysnap.png",
  },
  {
    name: "Sorting Visualiser",
    duration: "September 2023 - November 2023",
    description:
      "A web app that allows users to visualise and compare different sorting algorithms. Built with HTML, CSS, and JavaScript, it provides a user-friendly interface for selecting and configuring sorting algorithms, as well as displaying their respective time and space complexities.",
    techStack: ["HTML", "CSS", "JavaScript"],
    links: [
      {
        name: "Website",
        href: "https://sortingvisualiser-app.netlify.app/",
        icon: <Globe className="size-3" />,
      },
      {
        name: "Source",
        href: "https://github.com/actuallyakshat/sorting-visualiser",
        icon: <Github className="size-3" />,
      },
    ],
    image: "sortingvisualiser.png",
  },
  {
    name: "SRK Gallery",
    duration: "September 2024 - September 2024",
    description:
      "A cute little gallery of my favourite motivational clips of Shah Rukh Khan",
    techStack: ["Next.js", "Cloudinary", "React", "Tailwind CSS"],
    links: [
      {
        name: "Website",
        href: "https://srk-gallery.vercel.app",
        icon: <Globe className="size-3" />,
      },
      {
        name: "Source",
        href: "https://github.com/actuallyakshat/srk-gallery",
        icon: <Github className="size-3" />,
      },
    ],
    image: "srk-gallery.png",
  },
  {
    name: "Class Tag (Coming Soon)",
    duration: "August 2024 - Present",
    description:
      "A web app that allows teachers to create and manage attendance for their students. This project aims to solve the problem of students marking proxy attedance for students who are not present in the classroom. It has a data visualization feature that displays the attendance data in a visually appealing and easy-to-understand format.",
    techStack: [
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "React",
      "ShadCN UI",
      "Next Auth v5",
      "Prisma",
    ],
    links: [
      // {
      //   name: "Website",
      //   href: "#",
      //   icon: <Globe className="size-3" />,
      // },
      // {
      //   name: "Source",
      //   href: "#",
      //   icon: <Github className="size-3" />,
      // },
    ],
    image: "classtag.png",
  },
  {
    name: "LC Buddy (Coming Soon)",
    duration: "September 2024 - Present",
    description:
      "LeetCode buddy is a web app that allows users to compare their leetcode progress with their friends on a weekly basis, allowing them to be more conistent with their leetcode practice.",
    techStack: [
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "React",
      "ShadCN UI",
      "Prisma",
    ],
    links: [
      // {
      //   name: "Website",
      //   href: "#",
      //   icon: <Globe className="size-3" />,
      // },
      // {
      //   name: "Source",
      //   href: "#",
      //   icon: <Github className="size-3" />,
      // },
    ],
    image: "lc-buddy.png",
  },
];

export default function Projects() {
  return (
    <main className="relative px-8 pb-32">
      <div className="pt-24">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl/none">
            My Projects
          </h1>
          <p className="mt-2 text-lg tracking-tight text-muted-foreground">
            I&apos;ve always tried to solve problems that I have faced
            personally. <br />
            Here are some of them.
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-screen-sm grid-cols-1 gap-3 sm:grid-cols-2">
          {PROJECTS.map((project: any, index: number) => (
            <DetailedProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </main>
  );
}

interface ProjectCardProps {
  name: string;
  duration: string;
  description: string;
  image: string;
  techStack: string[];
  links: { name: string; href: string; icon: any }[];
}

function DetailedProjectCard(props: ProjectCardProps) {
  console.log(props.techStack);
  return (
    <div className="col-span-1 flex flex-col overflow-hidden rounded-3xl bg-white">
      <div className="relative h-[160px]">
        <Image
          src={"/projects/" + props.image}
          alt={props.name}
          layout="fill"
          objectFit="cover"
          className="object-center"
        ></Image>
      </div>
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h2 className="font-bold">{props.name}</h2>
          <h4 className="py-1 text-sm">{props.duration}</h4>
          <p className="text-xs text-muted-foreground">{props.description}</p>
        </div>

        <div>
          <div className="mt-3 flex flex-wrap items-center gap-1">
            {props.techStack.map((tech: any, index: number) => (
              <Badge
                key={index}
                className="rounded-sm text-[10px]"
                variant={"secondary"}
              >
                {tech}
              </Badge>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            {props.links.map((link: any, index: number) => (
              <Link href={link.href} key={index} target="_blank">
                <Badge className="flex items-center gap-2 rounded-sm py-1 text-[11px]">
                  {link.icon} {link.name}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
