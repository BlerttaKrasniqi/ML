import numpy
import pandas
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn import svm
from sklearn.metrics import accuracy_score
import warnings

warnings.filterwarnings(action='ignore',category=UserWarning,module='sklearn')

parkinsons_dataset = pandas.read_csv("Datasets/parkinsons_dataset.csv")

#print(parkinsons_dataset['status'].value_counts())

#Kontrollo missing values:
#print(parkinsons_dataset.isnull().sum())