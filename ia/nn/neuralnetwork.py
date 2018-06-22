class NeuralNetwork:
    def __init__(self, inputN, hiddenN, outputN):
        self.data = [0] * inputN
        self.hidden = [0] * hiddenN
        self.output = [0] * outputN

    def feed(self, data):
        if (len(data) != len(self.data)):
            raise Exception('Invalid length for data')
        self.data = data

    
