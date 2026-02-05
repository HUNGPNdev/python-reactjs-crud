from abc import ABC, abstractmethod

# Product 1: Chair
class Chair(ABC):
    @abstractmethod
    def sit_on(self):
        pass

# Product 2: Sofa
class Sofa(ABC):
    @abstractmethod
    def lie_on(self):
        pass

#========
#OfficeProducts
class OfficeChair(Chair):
    def sit_on(self):
        print("Sitting in office chair")

class OfficeSofa(Sofa):
    def lie_on(self):
        print("Lying on the office sofa")

# KitchenProducts
class KitchenChair(Chair):
    def sit_on(self):
        print("Sitting on the kitchen chair")

class KitchenSofa(Sofa):
    def lie_on(self):
        print("Lying on the kitchen sofa")

#========
class FurnitureFactory(ABC):
    @abstractmethod
    def create_chair(self) -> Chair:
        pass

    @abstractmethod
    def create_sofa(self) -> Sofa:
        pass

#========
class OfficeFurnitureFactory(FurnitureFactory):
    def create_chair(self) -> Chair:
        return OfficeChair()
    
    def create_sofa(self) -> Sofa:
        return OfficeSofa()

class KitchenFurnitureFactory(FurnitureFactory):
    def create_chair(self) -> Chair:
        return KitchenChair()
    
    def create_sofa(self) -> Sofa:
        return KitchenSofa()

#========
def client(factory: FurnitureFactory):
    chair = factory.create_chair()
    sofa = factory.create_sofa()
    chair.sit_on()
    sofa.lie_on()

print("=== Office ===")
client(OfficeFurnitureFactory())

print("\n=== Kitchen ===")
client(KitchenFurnitureFactory())

#========