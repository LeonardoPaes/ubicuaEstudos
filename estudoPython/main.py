import speech_recognition as sr
from time import ctime
import webbrowser 
import time
import playsound
import os
import random
from gtts import gTTS

r = sr.Recognizer()

key_words = ["buscar","sair","pesquisar"]
localization_key_words = ["rua","avenida","localizar"]

def pre_recorded_audio(audio_name):
    audio_file = sr.AudioFile(audio_name)
    with audio_file as source:
        audio_recorded = r.record(source)
        audio_data = r.recognize_google(audio_recorded,language='pt-BR')
        return audio_data.lower()
        

def record_audio(ask = False):
    with sr.Microphone() as source:
        if ask:
            bot_speak(ask)
        audio = r.listen(source)
        voice_data = ''
        try:
            voice_data = r.recognize_google(audio,language='pt-BR')
        except sr.UnknownValueError:
            bot_speak('Não entendi o que você disse, pode repetir')
        except sr.RequestError:
            bot_speak('Meu servidor caiu')
        return voice_data.lower()

def bot_speak(audio_string):
    tts = gTTS(text=audio_string, lang='pt')
    r = random.randint(1,1000000)
    audio_file = 'audio-' + str(r) + '.mp3'
    tts.save(audio_file)
    playsound.playsound(audio_file)
    print(audio_string)
    os.remove(audio_file)
'''
def respond(audio_data):
    if 'Qual o seu nome' in audio_data:
        bot_speak('Meu nome é Bot')
    if 'Que dia é hoje' in audio_data:
        bot_speak(ctime())
    if 'busca' in audio_data:
        search = record_audio("O que você quer que eu procure?")
        url = 'https://google.com/search?q=' + search
        webbrowser.get().open(url)
        bot_speak('Aqui está o que achei para ' + search)
    if 'achar localização' in audio_data:
        location = record_audio("Qual a localização?")
        url = 'https://google.nl/maps/place/' + location + '/&amp;'
        webbrowser.get().open(url)
        bot_speak('Aqui está a localização para ' + location)
    if 'sair' in voice_data:
        exit()
'''
def smart_respond(audio_data):
    for j in key_words:
        if j in audio_data:
            fundamental_response(j, audio_data)
            break
    else:
        for j in localization_key_words:
            if j in audio_data:
                localization_response(j, audio_data)
                break
        else:
            search_anyway(audio_data)

def search_anyway(audio_data):
    if audio_data != "":
        url = 'https://google.com/search?q=' + audio_data
        webbrowser.get().open(url)
        bot_speak('Aqui está o que achei para ' + audio_data)
    
def fundamental_response(key_word, audio_data):
    audio = audio_data.split(key_word)
    if (key_word == "buscar") or (key_word == "pesquisar"):
        url = 'https://google.com/search?q=' + audio[1]
        webbrowser.get().open(url)
        bot_speak('Aqui está o que achei para ' + audio[1])
    if key_word == "sair":
        exit()

def localization_response(key_word, audio_data):
    if (key_word == "localizar"):
        audio_data = audio_data.split(key_word)[1]

    url = 'https://google.nl/maps/place/' + audio_data + '/&amp;'
    webbrowser.get().open(url)
    bot_speak('Aqui está a localização para ' + audio_data)
'''
audio_data = pre_recorded_audio('teste1.wav')
respond(audio_data)
'''

time.sleep(1)
bot_speak ('Como posso te ajudar')
while 1:
    voice_data = record_audio()
    smart_respond(voice_data)
