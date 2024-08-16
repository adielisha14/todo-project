import { Link } from 'react-router-dom'
import taskimg from '../assets/img/tasks.svg'
import todolistimg from '../assets/img/todolist.svg'
import businessimg from '../assets/img/business.svg'
import stepsimg from '../assets/img/steps.svg'
import taskexemimg from '../assets/img/taskexem.svg'
import avatarcoffeeimg from '../assets/img/avatarcoffee.svg'
import avatarmimg from '../assets/img/avatarm.svg'
import avatarfeimg from '../assets/img/avatarfe.svg'
import producativeimg from '../assets/img/producative.svg'


export default function Sections () {

    return (

<>
{/* 1  */}
<div className="relative z-10 flex items-center overflow-hidden bg-background">
    <div className="container relative flex px-6 py-16 mx-auto">
        <div className="relative z-10 flex flex-col sm:w-2/3 lg:w-2/5">
            <span className="w-20 h-2 mb-12 bg-accent">
            </span>
            <h1 className="flex flex-col text-6xl font-black leading-none text-text uppercase font-bebas-neue sm:text-7xl">
                Get Organized,
                <span className="text-5xl sm:text-6xl">Get Ahead.</span>
            </h1>
            <p className="text-sm text-text/80 sm:text-base">
            Experience a new level of productivity with our comprehensive task management solution. Our app is designed to help you manage tasks with precision, from setting priorities to tracking progress. Share tasks with your team, set deadlines, and watch as your productivity soars.
            </p>
            <div className="flex mt-8">
                <Link to={'/register'} className="px-4 py-2 mr-4 text-background uppercase bg-accent border-2 border-transparent rounded-lg text-md hover:bg-primary/90">
                    Get started
                </Link>
                <Link to={'/'} className="px-4 py-2 text-accent uppercase bg-transparent border-2 border-accent rounded-lg hover:bg-accent hover:text-background text-md">
                    Explore for exemples
                </Link>
            </div>
        </div>
        <div className="md:relative hidden bottom-0 sm:w-1/3 md:flex lg:w-3/5">
            <img src={stepsimg} className="max-w-xs md:items-center md:justify-center md:m-auto mb-0 md:max-w-sm"/>
        </div>
    </div>
</div>

{/* 2 */}
    <div className="bg-background">
        <div className="bg-secondary/15 text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-10">
            <h2 className="text-3xl font-extrabold text-text sm:text-4xl">
                <span className="block">
                    Your Path to Productivity 
                </span>
                <span className="block text-accent">
                    Starts Here.
                </span>
            </h2>
            <p className="text-xl mt-4 max-w-md mx-auto text-text/50">
                Enhance your productivity with features that help you manage tasks, 
                set reminders, and track progress with ease.</p>
            <div className="lg:mt-0 lg:flex-shrink-0">
                <div className="mt-12 inline-flex rounded-lg shadow">
                    <button type="button" className="py-3 px-5  bg-primary/85 hover:bg-primary focus:ring-accent/50 focus:ring-offset-secondary text-background w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
                        Scroll down to know more
                    </button>
                </div>
            </div>
        </div>
    </div>

{/* 3 */}
<div className="bg-background overflow-hidden relative lg:flex lg:items-center">
    <div className="w-full py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-10">
        <h2 className="text-3xl font-extrabold text-text sm:text-4xl">
            <span className="block">
                Task Management Made Simple
            </span>
        </h2>
        <p className="text-md mt-4 text-text/50">
            Stay ahead of your goals with a user-friendly interface that simplifies task management and fosters teamwork.</p>
        <div className="lg:mt-0 lg:flex-shrink-0">
            <div className="mt-12 inline-flex rounded-lg shadow">
                <button type="button" className="py-2 px-4  bg-primary/85 hover:bg-primary focus:ring-accent/50 focus:ring-offset-secondary text-background w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    Join Now
                </button>
            </div>
        </div>
    </div>
    <div className="flex items-center gap-8 p-8 lg:p-24">
        <img src={taskimg} className="w-1/2 rounded-lg" alt="image"/>
        <div>
            <img src={businessimg} className="rounded-lg" alt="image"/>
            <img src={todolistimg} className="mb-8 rounded-lg" alt="image"/>
        </div>
    </div>
</div>

{/* 4 */}
<div className="bg-background">
<section id="features"
    className="relative block px-6 py-10 md:py-20 md:px-10 bg-secondary/15">


    <div className="relative mx-auto max-w-5xl text-center">
        <span className="text-text/80 my-3 flex items-center justify-center font-medium uppercase tracking-wider">
        Why choose us
        </span>
        <h2
            className="block w-full bg-gradient-to-b from-accent to-primary bg-clip-text font-bold text-transparent text-3xl sm:text-4xl">
            Seamlessly organize your daily tasks<br/>with intuitive planning tools
        </h2>
        <p
            className="mx-auto my-4 w-full max-w-xl text-center font-medium leading-relaxed tracking-wide text-text/80">
            Revolutionize your approach to task management with our all-in-one app. Our intuitive interface and smart planning tools are designed to help you stay on top of your tasks, 
            meet deadlines, and achieve your goals. With collaborative features and real-time updates, you'll enhance both individual and team productivity
        </p>
    </div>

    <div className="relative mx-auto max-w-7xl z-10 grid grid-cols-1 gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-md bg-primary/15 p-8 text-center shadow">
            <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-sm text-text/80 bg-accent"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-color-swatch" width="24"
                    height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M19 3h-4a2 2 0 0 0 -2 2v12a4 4 0 0 0 8 0v-12a2 2 0 0 0 -2 -2"></path>
                    <path d="M13 7.35l-2 -2a2 2 0 0 0 -2.828 0l-2.828 2.828a2 2 0 0 0 0 2.828l9 9"></path>
                    <path d="M7.3 13h-2.3a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h12"></path>
                    <line x1="17" y1="17" x2="17" y2="17.01"></line>
                </svg>
            </div>
            <h3 className="mt-6 text-text/80">Customizable</h3>
            <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-primary/90">Choose your perfere color scheme design.
            </p>
        </div>

        <div className="rounded-md bg-primary/15 p-8 text-center shadow">
            <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-sm text-text/80 bg-accent"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bolt" width="24"
                    height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <polyline points="13 3 13 10 19 10 11 21 11 14 5 14 13 3"></polyline>
                </svg>
            </div>
            <h3 className="mt-6 text-text/80">Workflow</h3>
            <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-primary/90">Streamline Your Tasks, Maximize Your Time
            </p>
        </div>

        <div className="rounded-md bg-primary/15 p-8 text-center shadow">
            <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-sm text-text/80 bg-accent"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-tools" width="24"
                    height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4"></path>
                    <line x1="14.5" y1="5.5" x2="18.5" y2="9.5"></line>
                    <polyline points="12 8 7 3 3 7 8 12"></polyline>
                    <line x1="7" y1="8" x2="5.5" y2="9.5"></line>
                    <polyline points="16 12 21 17 17 21 12 16"></polyline>
                    <line x1="16" y1="17" x2="14.5" y2="18.5"></line>
                </svg>
            </div>
            <h3 className="mt-6 text-text/80">Team collaboration</h3>
            <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-primary/90">
                Collaborate with team members and share tasks to enhance productivity
            </p>
        </div>
    </div>
</section>
</div>

{/* 5 */}
<div className="relative z-10 flex items-center bg-background">
    <div className="container relative flex flex-col items-center justify-between px-6 py-8 mx-auto">
        <div className="flex flex-col">
            <h1 className="w-full text-4xl font-light text-center text-text uppercase sm:text-5xl">
                Effortless Task Management for Maximum Efficiency
            </h1>
            <h2 className="w-full max-w-2xl py-8 mx-auto text-xl font-light text-center text-text/80">
                Elevate your productivity with our powerful task management app. Designed to streamline your workflow, our app provides an array of features to help you prioritize tasks, set deadlines, and track progress. Whether you're managing personal goals or working with a team, you'll find the tools you need to stay organized and efficient.
            </h2>
            <div className="flex items-center justify-center mt-4">
                <Link to="#" className="px-4 py-2 rounded-lg mr-4 text-background uppercase bg-primary/90 border-2 border-primary text-md hover:bg-primary">
                    Get started
                </Link>
                <Link to="#" className="px-4 py-2 rounded-lg text-primary uppercase border-2 border-primary hover:text-background/90 hover:bg-primary/90 text-md">
                    Learn more
                </Link>
            </div>
        </div>
        <div className="relative block w-full mx-auto mt-6 md:mt-0">
            <img src={producativeimg} className="max-w-xs m-auto mt-10 md:max-w-2xl"/>
        </div>
    </div>
</div>

{/* 6 */}
{/* <section className="bg-background flex flex-row px-6 py-10 mx-auto">
<div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
    <div className="w-full h-64 bg-center bg-contain bg-no-repeat rounded-md shadow-md" style={{backgroundImage: `url(${taskexemimg})`}}></div>

    <div className="w-56 -mt-10 overflow-hidden bg-background rounded-md shadow-lg md:w-64">
        <h3 className="py-2 font-bold tracking-wide text-center text-text uppercase">To do</h3>

        <div className="flex items-center justify-between px-3 py-2 bg-secondary/30">
            <span className="font-bold text-text">time</span>
            <button className="px-2 py-1 text-xs font-semibold text-background uppercase transition-colors duration-300 transform bg-primary/90 rounded-sm hover:bg-primary focus:bg-primary">More</button>
        </div>
    </div>
</div>
<div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
    <div className="w-full h-64 bg-center bg-contain bg-no-repeat rounded-md shadow-md" style={{backgroundImage: `url(${taskexemimg})`}}></div>
    <div className="w-56 -mt-10 overflow-hidden bg-background rounded-md shadow-lg md:w-64">
        <h3 className="py-2 font-bold tracking-wide text-center text-text uppercase">To do</h3>
        <div className="flex items-center justify-between px-3 py-2 bg-secondary/30">
            <span className="font-bold text-text">time</span>
            <button className="px-2 py-1 text-xs font-semibold text-background uppercase transition-colors duration-300 transform bg-primary/90 rounded-sm hover:bg-primary focus:bg-primary">More</button>
        </div>
    </div>
</div>
<div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
    <div className="w-full h-64 bg-center bg-contain bg-no-repeat rounded-md shadow-md" style={{backgroundImage: `url(${taskexemimg})`}}></div>
    <div className="w-56 -mt-10 overflow-hidden bg-background rounded-md shadow-lg md:w-64">
        <h3 className="py-2 font-bold tracking-wide text-center text-text uppercase">To do</h3>
        <div className="flex items-center justify-between px-3 py-2 bg-secondary/30">
            <span className="font-bold text-text">time</span>
            <button className="px-2 py-1 text-xs font-semibold text-background uppercase transition-colors duration-300 transform bg-primary/90 rounded-sm hover:bg-primary focus:bg-primary">More</button>
        </div>
    </div>
</div>
</section> */}

{/* 7 */}
<section className="bg-background">
    <div className="container px-6 py-10 mx-auto">
        <div className="mt-6 md:flex md:items-center md:justify-between">
            <div>
                <h1 className="text-2xl font-semibold text-text capitalize lg:text-3xl">
                    What our clients are saying
                </h1>
                <div className="flex mx-auto mt-6">
                    <span className="inline-block w-40 h-1 bg-accent rounded-full"></span>
                    <span className="inline-block w-3 h-1 mx-1 bg-accent rounded-full"></span>
                    <span className="inline-block w-1 h-1 bg-accent rounded-full"></span>
                </div>
            </div>
            <div className="flex justify-between mt-8 md:mt-0">
                <button title="left arrow" className="p-2 mx-3 text-text transition-colors duration-300 border rounded-full rtl:-scale-x-100 hover:bg-secondary/40">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button title="right arrow" className="p-2 text-text transition-colors duration-300 border rounded-full rtl:-scale-x-100 hover:bg-secondary/40">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>

        <section className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 lg:grid-cols-2 xl:grid-cols-3">
            <div className="p-8 bg-secondary/40 rounded-md">
                <p className="leading-loose text-text/80">
                    “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad
                    tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda rerum, culpa
                    aperiam dolorum, obcaecati corrupti aspernatur”
                </p>
                <div className="flex items-center mt-8 -mx-2">
                    <img className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-accent" src={avatarfeimg} alt="" />
                    <div className="mx-2">
                        <h1 className="font-semibold text-text/90">Tehila</h1>
                        <span className="text-sm text-primary/80">Backend Queen</span>
                    </div>
                </div>
            </div>

            <div className="p-8 bg-primary/90 rounded-md">
                <p className="leading-loose text-background/70">
                    “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad
                    tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda rerum, culpa
                    aperiam dolorum, obcaecati corrupti aspernatur”
                </p>
                <div className="flex items-center mt-8 -mx-2">
                    <img className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-secondary/80" src={avatarmimg} alt="" />
                    <div className="mx-2">
                        <h1 className="font-semibold text-background">Yahav</h1>
                        <span className="text-sm text-secondary/95">FullStack Dev at Wix</span>
                    </div>
                </div>
            </div>

            <div className="p-8 bg-secondary/40 rounded-md">
                <p className="leading-loose text-text/80">
                    “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad
                    tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda rerum, culpa
                    aperiam dolorum, obcaecati corrupti aspernatur”
                </p>
                <div className="flex items-center mt-8 -mx-2">
                    <img className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-accent" src={avatarcoffeeimg} alt="" />
                    <div className="mx-2">
                        <h1 className="font-semibold text-text/90">Yakov</h1>
                        <span className="text-sm text-primary/80">Financial manager</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
</section>
</>
);
};