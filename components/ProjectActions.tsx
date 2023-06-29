import Link from 'next/link'
import React from 'react'

const ProjectActions = ({ projectId }: { projectId: string }) => {
  return (
    <>
        <Link
            href={`/edit-project/${projectId}`}
            className="flexCenter edit-action_btn"
        >
        
        </Link>
    </>
  )
}

export default ProjectActions