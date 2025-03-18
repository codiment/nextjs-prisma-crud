import {prisma} from "@/libs/prisma";
import TaskCard from "@/app/components/TaskCard";

async function loadTasks() {
    const tasks = await prisma.task.findMany()
    return tasks
}


async function HomePage() {
    const tasks = await loadTasks()

  return (
    <>
      <div className='grid grid-cols-3 gap-3 mt-5'>
          {tasks.map(task => (
              <TaskCard task={task} key={task.id}/>
          ))}
      </div>
    </>
  )
}

export default HomePage;
