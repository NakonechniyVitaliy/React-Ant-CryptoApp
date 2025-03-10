<?php

namespace App\Controller\Api;

use App\Entity\Asset;
use App\Entity\User;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

final class ApiRegistrationController extends AbstractController
{

    #[Route('/api/registration', name: 'app_registration')]
    public function index(Request $request, EntityManagerInterface $em, UserPasswordHasherInterface $passwordHasher): Response
{
    //        $filePath = $this->getParameter('kernel.project_dir') . '/var/log/request_dump.log';
    //        file_put_contents($filePath, $data . PHP_EOL, FILE_APPEND);

        $data = json_decode($request->getContent(), true);

        $newUser = new User();
        $newUser->setUsername($data['username']);
        $newUser->setEmail($data['email']);

        $hashedPassword = $passwordHasher->hashPassword($newUser, $data['password']);
        $newUser->setPassword($hashedPassword);

        $em->persist($newUser);
        $em->flush();

        return new Response('Data saved to file', Response::HTTP_OK);

    }
}
