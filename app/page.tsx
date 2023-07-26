"use client";
import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
import ProjectCard from "@/components/ProjectCard";
import { fetchAllPreviousProjects, fetchAllProjects } from "@/lib/actions";

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

type SearchParams = {
  category?: string | null;
  endcursor?: string | null;
  startcursor?: string | null;
}

type Props = {
  searchParams: SearchParams;
}

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;


let previous = false;
const Home = async ({ searchParams: { category, endcursor, startcursor }}:Props) => {
  const handleStateChange = (value: boolean) => {
    previous = value
  }
  let data = {} as ProjectSearch;
  if (previous === false) {
    data = (await fetchAllProjects(category, endcursor )) as ProjectSearch;
  } else {
    data = (await fetchAllPreviousProjects(category, startcursor )) as ProjectSearch;
  }
  const projectsToDisplay = data?.projectSearch?.edges || [];

  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />
        <p className="no-result-text text-center">
          No projects found, go create some first.
        </p>
      </section>
    );
  }
  const pagination = data?.projectSearch?.pageInfo
  return (
    <section className="flex-start flex-col paddings mb-16">
      <Categories />
      <section className="projects-grid">
        {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={node?.id}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy?.name}
            avatarUrl={node?.createdBy?.avatarUrl}
            userId={node?.createdBy?.id}
          />
        ))}
      </section>
      <LoadMore 
        startCursor={pagination?.startCursor}
        endCursor={pagination?.endCursor}
        hasPreviousPage={pagination?.hasPreviousPage}
        hasNextPage={previous === true ? true : pagination?.hasNextPage}
        setState={(value) => handleStateChange(value)}
      />
    </section>
  );
};

export default Home;
