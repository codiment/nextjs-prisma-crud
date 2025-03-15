function NewPage() {
    return (
        <div>
        <section className="h-screen flex items-center justify-center">

            <form>
                <input type="text" placeholder='write a title'
                    className="px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300 text-white block w-full mb-2"
                />
                <textarea placeholder='write a description'
                          className="px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300 text-white block w-full"
                ></textarea>
                <button>
                    Create
                </button>
            </form>

        </section>
        </div>
    )
}

export default NewPage;