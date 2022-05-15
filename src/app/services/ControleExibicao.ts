export class ControleExibicao {
    private static instance: ControleExibicao;
  
    public tela = 0;
  
  
    private constructor() { }
  
  
    public static getInstance(): ControleExibicao {
        if (!ControleExibicao.instance) {
          ControleExibicao.instance = new ControleExibicao();
        }
  
        return ControleExibicao.instance;
    }
  
  
    /**
     * Finally, any singleton should define some business logic, which can be
     * executed on its instance.
     */
    public someBusinessLogic() {
        // ...
    }
  }
     
  