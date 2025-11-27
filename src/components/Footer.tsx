function Footer() {
    return (
        <footer className="bg-mlb-blue text-white py-8 mt-12">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <h3 className="text-xl font-bold mb-4">Baseball Kids Hub</h3>
                    <p className="text-gray-300 mb-4">
                        Комплексная образовательно-спортивная платформа для детей 8-12 лет
                    </p>
                    <div className="flex justify-center space-x-6">
                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                            О проекте
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                            Контакты
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                            Помощь
                        </a>
                    </div>
                    <p className="text-gray-400 mt-6 text-sm">
                        © 2025 Baseball Kids Hub. Все права защищены.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer